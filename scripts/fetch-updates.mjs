
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

// Configuration
const KENYA_LAW_BASE_URL = 'https://new.kenyalaw.org';
const KENYA_LAW_COUNTIES_INDEX = 'https://new.kenyalaw.org/legislation/counties/';
const KIPPRA_SEARCH_ENDPOINTS = [
  "https://repository.kippra.or.ke/search?query={q}",
  "https://repository.kippra.or.ke/discover?query={q}"
];

const ACTS_FILE_PATH = path.resolve('data/legislation/acts.ts');
const POLICIES_FILE_PATH = path.resolve('data/knowledge-base/county-policies.ts');
const COUNTY_LAWS_FILE_PATH = path.resolve('data/legislation/county-laws.ts');
const EIB_PROJECTS_FILE_PATH = path.resolve('data/foreign-projects/eib.ts');

// List of counties for KIPPRA search
const COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo/Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi City",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita/Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

// Utility to delay execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Scrapes National Acts of Parliament
 */
async function scrapeNationalActs() {
  console.log('🔍 Scraping National Acts from new.kenyalaw.org...');
  const allLaws = [];
  const seenUrls = new Set();
  const MAX_PAGES = 5; // Check first 5 pages for updates

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const url = `https://new.kenyalaw.org/legislation/?page=${page}`;
      try {
        const { data } = await axios.get(url, { timeout: 30000 });
        const $ = cheerio.load(data);
        
        $('a[href*="/akn/ke/"]').each((_, el) => {
            const link = $(el);
            let title = link.text().trim().replace(/[\u2192\u2190\u25b6\u21d2]/g, '').replace(/\s+/g, ' ').trim();
            let href = link.attr('href');
            
            if (!href || !title) return;
            if (href.startsWith('/')) href = `${KENYA_LAW_BASE_URL}${href}`;
            
            if (!seenUrls.has(href)) {
                seenUrls.add(href);
                allLaws.push({ title, url: href, status: 'in force' });
            }
        });
      } catch (err) {
        console.error(`    Error fetching page ${page}: ${err.message}`);
      }
    }
    return allLaws;
  } catch (error) {
    console.error('Error scraping national acts:', error);
    return [];
  }
}

/**
 * Scrapes County Laws
 * 1. Fetches the county index page to get links for each county.
 * 2. Visits each county page to extract laws.
 */
async function scrapeCountyLaws() {
  console.log('🔍 Starting County Laws Scrape...');
  const countyLegislationData = [];

  try {
    // Step 1: Get list of county pages
    console.log(`  Fetching county index: ${KENYA_LAW_COUNTIES_INDEX}`);
    const { data: indexData } = await axios.get(KENYA_LAW_COUNTIES_INDEX);
    const $index = cheerio.load(indexData);
    
    const countyPages = [];
    $index('a').each((_, el) => {
        const href = $index(el).attr('href');
        const text = $index(el).text().trim();
        if (href && href.includes('/legislation/counties/') && text.toLowerCase().includes('county')) {
            countyPages.push({ name: text.replace(' County', '').trim(), url: href.startsWith('/') ? `${KENYA_LAW_BASE_URL}${href}` : href });
        }
    });

    console.log(`  Found ${countyPages.length} county pages.`);

    // Step 2: Scrape each county page
    for (const county of countyPages) {
        console.log(`  Processing ${county.name}...`);
        try {
            const { data: countyData } = await axios.get(county.url, { timeout: 30000 });
            const $ = cheerio.load(countyData);
            const acts = [];
            const bills = [];
            const seen = new Set();

            $('a').each((_, el) => {
                const link = $(el);
                const href = link.attr('href');
                const title = link.text().trim().replace(/[\u2192\u2190\u25b6\u21d2]/g, '').trim();

                if (href && (href.includes('/act/') || href.includes('/ln/')) && title.length > 5 && !seen.has(href)) {
                    seen.add(href);
                    const fullUrl = href.startsWith('/') ? `${KENYA_LAW_BASE_URL}${href}` : href;
                    
                    // Basic categorization based on title or URL structure
                    // Note: In a real scenario, we'd inspect the content or precise URL structure more deeply
                    if (title.toLowerCase().includes('bill') || href.includes('/ln/')) {
                        bills.push({ name: title, url: fullUrl });
                    } else {
                        acts.push({ name: title, url: fullUrl });
                    }
                }
            });

            if (acts.length > 0 || bills.length > 0) {
                countyLegislationData.push({
                    countyName: county.name,
                    acts: acts,
                    bills: bills
                });
            }
            
            await sleep(500); // Be polite
        } catch (e) {
            console.error(`    Failed to scrape ${county.name}: ${e.message}`);
        }
    }
  } catch (error) {
    console.error('Error in scrapeCountyLaws:', error);
  }
  
  return countyLegislationData;
}

/**
 * Scrapes KIPPRA for Policies
 * Uses multiple search endpoints and paginates.
 */
async function scrapeKippraPolicies() {
  console.log('🔍 Starting KIPPRA Policy Scrape...');
  const policiesMap = {};

  for (const county of COUNTIES) {
    console.log(`  Searching documents for: ${county}`);
    const countyDocs = [];
    const seenUrls = new Set();
    const q = encodeURIComponent(county);

    for (const endpoint of KIPPRA_SEARCH_ENDPOINTS) {
        const url = endpoint.replace('{q}', q);
        try {
            const { data } = await axios.get(url, { 
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 20000 
            });
            const $ = cheerio.load(data);

            $('a[href*="/handle/"]').each((_, el) => {
                const link = $(el);
                const href = link.attr('href');
                const title = link.text().trim();
                
                if (href && title && !seenUrls.has(href)) {
                    // Filter for relevant documents
                    const tLower = title.toLowerCase();
                    if (tLower.includes('development plan') || tLower.includes('cidp') || tLower.includes('budget') || tLower.includes('strategy') || tLower.includes('policy')) {
                         seenUrls.add(href);
                         countyDocs.push({
                             title: title,
                             url: `https://repository.kippra.or.ke${href}`
                         });
                    }
                }
            });
            
            if (countyDocs.length > 0) break; // Found items on this endpoint, move to next county
        } catch (e) {
            // Ignore errors and try next endpoint
        }
        await sleep(1000);
    }
    
    if (countyDocs.length > 0) {
        policiesMap[county] = countyDocs;
        console.log(`    Found ${countyDocs.length} docs.`);
    }
  }

  return policiesMap;
}

/**
 * Scrapes EIB Projects in Kenya
 */
async function scrapeEIBProjects() {
    console.log('🔍 Scraping EIB Projects...');
    const projects = [];
    // Note: EIB search pages often use dynamic loading. This scraper attempts to hit the basic search URL.
    // In a real-world scenario with dynamic content, Puppeteer/Playwright might be needed, or hitting their API directly.
    // We will attempt to scrape pages 0 to 3 (1 to 4) as requested.
    
    for (let page = 0; page < 4; page++) {
        const url = `https://www.eib.org/en/projects/all/index?q=kenya&sortColumn=statusDate&sortDir=desc&pageNumber=${page}&itemPerPage=25&pageable=true&la=EN&deLa=EN&yearFrom=&orYearFrom=true&yearTo=&orYearTo=true&orStatus=true&orRegions=true&orCountries=true&orSectors=true`;
        console.log(`  Fetching EIB page ${page + 1}...`);
        
        try {
            const { data } = await axios.get(url, { 
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 20000 
            });
            const $ = cheerio.load(data);
            
            // EIB project list structure varies, but often looks like this in their server-rendered view or fallbacks
            // Targeting common row/item structures.
            // Note: If EIB renders via JS only, this axios fetch might return empty shells.
            // Assuming some SSR or basic HTML presence.
            
            $('.row-item, .project-row').each((_, el) => {
                const $el = $(el);
                const titleEl = $el.find('h3 a, .project-title a');
                const title = titleEl.text().trim();
                const link = titleEl.attr('href');
                
                if (title && link) {
                    // Extract other details if available in the list view
                    const sector = $el.find('.sector, .project-sector').text().trim() || 'Unknown Sector';
                    const status = $el.find('.status, .project-status').text().trim() || 'Unknown Status';
                    const amount = $el.find('.amount, .project-cost').text().trim() || 'N/A';
                    const description = $el.find('.description, .project-desc').text().trim();
                    const dateStr = $el.find('.date, .project-date').text().trim(); // e.g. signed date
                    const year = dateStr ? dateStr.split('/').pop() : new Date().getFullYear().toString();

                    const fullUrl = link.startsWith('http') ? link : `https://www.eib.org${link}`;

                    projects.push({
                        title,
                        sector,
                        status,
                        amount,
                        description,
                        url: fullUrl,
                        year
                    });
                }
            });
            
             await sleep(1000);

        } catch (e) {
             console.error(`  Error scraping EIB page ${page}: ${e.message}`);
        }
    }

    console.log(`  Found ${projects.length} EIB projects.`);
    return projects;
}

/**
 * Writes the updated County Laws to file
 */
async function updateCountyLawsFile(data) {
    if (data.length === 0) return;

    const fileContent = `
import type { CountyLegislation } from '../../types';
export { devolutionLawsData } from './devolution-laws';

export const countyLawsData: CountyLegislation[] = ${JSON.stringify(data, null, 2)};
`.trim();

    await fs.writeFile(COUNTY_LAWS_FILE_PATH, fileContent);
    console.log(`✅ Updated ${COUNTY_LAWS_FILE_PATH}`);
}

/**
 * Writes the updated County Policies to file
 */
async function updateCountyPoliciesFile(data) {
    if (Object.keys(data).length === 0) return;

    const fileContent = `
export interface PolicyDocument {
  title: string;
  url: string;
}

export const countyPolicyDocuments: Record<string, PolicyDocument[]> = ${JSON.stringify(data, null, 2)};
`.trim();

    await fs.writeFile(POLICIES_FILE_PATH, fileContent);
    console.log(`✅ Updated ${POLICIES_FILE_PATH}`);
}

/**
 * Writes the updated EIB Projects to file
 */
async function updateEIBProjectsFile(data) {
    if (data.length === 0) {
        console.log('ℹ️ No EIB projects found to update.');
        return;
    }

    const fileContent = `
import type { EIBProject } from '../../types';

export const eibProjects: EIBProject[] = ${JSON.stringify(data, null, 2)};
`.trim();

    // Ensure directory exists
    await fs.mkdir(path.dirname(EIB_PROJECTS_FILE_PATH), { recursive: true });
    await fs.writeFile(EIB_PROJECTS_FILE_PATH, fileContent);
    console.log(`✅ Updated ${EIB_PROJECTS_FILE_PATH}`);
}

/**
 * Updates National Acts File (Simplified for this context)
 */
async function updateNationalActsFile(newActs) {
    // Logic to merge new acts into existing acts.ts file would go here.
    console.log(`ℹ️  National Acts Scraper found ${newActs.length} items. (File update skipped in this demo step)`);
}

// Main Execution
(async () => {
  console.log('🚀 Starting Comprehensive Data Update...');
  
  // 1. County Laws
  const countyLaws = await scrapeCountyLaws();
  await updateCountyLawsFile(countyLaws);

  // 2. KIPPRA Policies
  const policies = await scrapeKippraPolicies();
  await updateCountyPoliciesFile(policies);
  
  // 3. EIB Projects
  const eibProjects = await scrapeEIBProjects();
  await updateEIBProjectsFile(eibProjects);

  // 4. National Acts (Optional/Secondary)
  const nationalActs = await scrapeNationalActs();
  await updateNationalActsFile(nationalActs);

  console.log('🏁 Update process completed.');
})();
