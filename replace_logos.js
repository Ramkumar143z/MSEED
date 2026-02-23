const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newLogos = `
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3ETCS%3C/text%3E%3C/svg%3E" alt="TCS"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EInfosys%3C/text%3E%3C/svg%3E" alt="Infosys"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EWipro%3C/text%3E%3C/svg%3E" alt="Wipro"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3ECognizant%3C/text%3E%3C/svg%3E" alt="Cognizant"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EAccenture%3C/text%3E%3C/svg%3E" alt="Accenture"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EZoho%3C/text%3E%3C/svg%3E" alt="Zoho"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EFreshworks%3C/text%3E%3C/svg%3E" alt="Freshworks"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EGoogle%3C/text%3E%3C/svg%3E" alt="Google"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EMicrosoft%3C/text%3E%3C/svg%3E" alt="Microsoft"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EAmazon%3C/text%3E%3C/svg%3E" alt="Amazon"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EMeta%3C/text%3E%3C/svg%3E" alt="Meta"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3ENetflix%3C/text%3E%3C/svg%3E" alt="Netflix"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EApple%3C/text%3E%3C/svg%3E" alt="Apple"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EIBM%3C/text%3E%3C/svg%3E" alt="IBM"></div>
            <div class="partner-logo-item"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='36'%3E%3Crect width='110' height='36' rx='6' fill='%23f0f0f0'/%3E%3Ctext x='55' y='24' text-anchor='middle' font-family='sans-serif' font-size='13' font-weight='700' fill='%23444'%3EOracle%3C/text%3E%3C/svg%3E" alt="Oracle"></div>
`;

html = html.replace(/<div class="partner-strip-track">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, `<div class="partner-strip-track">
${newLogos}
${newLogos}
          </div>
        </div>
      </section>`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Replaced successfully!');
