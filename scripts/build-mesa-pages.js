const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(root, f), c);

function transform(html, map) {
  let out = html;
  map.forEach(([from, to]) => {
    out = out.replace(from, to);
  });
  return out;
}

// Gilbert from Bellevue
let gilbert = read("mobile-mechanic-bellevue.html");
gilbert = transform(gilbert, [
  [/Bellevue, NE/g, "Gilbert, AZ"],
  [/Bellevue/g, "Gilbert"],
  [/mobile-mechanic-bellevue/g, "mobile-mechanic-gilbert"],
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],
  [/Nebraska/g, "Arizona"],
  [/Offutt AFB, Twin Creek, Olde Towne/g, "Val Vista Lakes, Power Ranch, Morrison Ranch"],
  [/Offutt AFB and Olde Towne to Twin Creek, Fairview Hills, and everywhere in between/g, "the Heritage District to Power Ranch, Val Vista Lakes, Morrison Ranch, and everywhere in between"],
  [/Offutt AFB and Olde Towne to Twin Creek, Fairway Hills, and everywhere in between/g, "the Heritage District to Power Ranch, Val Vista Lakes, Morrison Ranch, and everywhere in between"],
  [/Capehart Road/g, "SanTan Village"],
  [/greater Omaha metro/g, "East Valley"],
  [/Greater Omaha, NE/g, "East Valley, AZ"],
  [/href="\/"/g, 'href="/mesa"'],
  [/href="\/omaha"/g, 'href="/mesa"'],
  [/href="\/mobile-mechanic-papillion"/g, 'href="/mobile-mechanic-chandler"'],
  [/href="\/check-engine-light-omaha"/g, 'href="/check-engine-light-mesa"'],
  [/>Omaha</g, ">Mesa<"],
  [/>Papillion</g, ">Chandler<"],
  [/La Vista · Council Bluffs · Elkhorn/g, "Tempe · Queen Creek · Apache Junction"],
  [/41\.1544/g, "33.3528"],
  [/-95\.9146/g, "-111.7890"],
  [/styles\.css\?v=15/g, "styles.css?v=16"],
  [/home\.css\?v=6/g, "home.css?v=10"],
  [/site-config\.js\?v=7/g, "site-config.js?v=8"],
  [/tracking\.js\?v=9/g, "tracking.js?v=10"],
  [/main\.js\?v=13/g, "main.js?v=14"],
  [/<body class="site-home">/, '<body class="site-home" data-market="mesa">'],
  [/Main Site/g, "Mesa Home"],
  [/New lead — lets-wrench\.com \(Bellevue\)/g, "New lead — lets-wrench.com (Gilbert)"],
  [/New lead — lets-wrench\.com"/g, 'New lead — lets-wrench.com (Gilbert)"'],
]);
write("mobile-mechanic-gilbert.html", gilbert);
console.log("Wrote gilbert");

// Chandler from Papillion
let chandler = read("mobile-mechanic-papillion.html");
chandler = transform(chandler, [
  [/Papillion, NE/g, "Chandler, AZ"],
  [/Papillion/g, "Chandler"],
  [/mobile-mechanic-papillion/g, "mobile-mechanic-chandler"],
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],
  [/Nebraska/g, "Arizona"],
  [/Shadow Lake, Tara Hills, Walnut Creek/g, "Ocotillo, downtown Chandler, Sun Lakes"],
  [/Shadow Lake and Tara Hills to Walnut Creek, Eagle Run, and downtown Papillion/g, "Ocotillo and downtown Chandler to Sun Lakes, and everywhere in between"],
  [/Shadow Lake and Tara Hills to Walnut Creek, Eagle Run, and downtown Chandler/g, "Ocotillo and downtown Chandler to Sun Lakes, and everywhere in between"],
  [/Schram Road/g, "the Loop 202"],
  [/Shadow Lake to a brake job near Schram Road/g, "Ocotillo to a brake job near the Loop 202"],
  [/greater Omaha metro/g, "East Valley"],
  [/Greater Omaha, NE/g, "East Valley, AZ"],
  [/href="\/"/g, 'href="/mesa"'],
  [/href="\/omaha"/g, 'href="/mesa"'],
  [/href="\/mobile-mechanic-bellevue"/g, 'href="/mobile-mechanic-gilbert"'],
  [/href="\/check-engine-light-omaha"/g, 'href="/check-engine-light-mesa"'],
  [/>Omaha</g, ">Mesa<"],
  [/>Bellevue</g, ">Gilbert<"],
  [/La Vista · Gretna · Council Bluffs/g, "Tempe · Queen Creek · Gilbert"],
  [/styles\.css\?v=15/g, "styles.css?v=16"],
  [/home\.css\?v=6/g, "home.css?v=10"],
  [/site-config\.js\?v=7/g, "site-config.js?v=8"],
  [/tracking\.js\?v=9/g, "tracking.js?v=10"],
  [/main\.js\?v=13/g, "main.js?v=14"],
  [/<body class="site-home">/, '<body class="site-home" data-market="mesa">'],
  [/Main Site/g, "Mesa Home"],
  [/New lead — lets-wrench\.com \(Papillion\)/g, "New lead — lets-wrench.com (Chandler)"],
  [/New lead — lets-wrench\.com \(Chandler\)/g, "New lead — lets-wrench.com (Chandler)"],
  [/New lead — lets-wrench\.com"/g, 'New lead — lets-wrench.com (Chandler)"'],
]);
write("mobile-mechanic-chandler.html", chandler);
console.log("Wrote chandler");

// Check engine Mesa from Omaha
let cel = read("check-engine-light-omaha.html");
cel = transform(cel, [
  [/Omaha/g, "Mesa"],
  [/check-engine-light-omaha/g, "check-engine-light-mesa"],
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],
  [/Nebraska/g, "Arizona"],
  [/greater Omaha metro/g, "East Valley"],
  [/Greater Omaha, NE/g, "East Valley, AZ"],
  [/href="\/mobile-mechanic-bellevue"/g, 'href="/mobile-mechanic-gilbert"'],
  [/href="\/mobile-mechanic-papillion"/g, 'href="/mobile-mechanic-chandler"'],
  [/>Bellevue</g, ">Gilbert<"],
  [/>Papillion</g, ">Chandler<"],
  [/La Vista · Council Bluffs/g, "Tempe · Queen Creek"],
  [/41\.2565/g, "33.4152"],
  [/-95\.9345/g, "-111.8315"],
  [/styles\.css\?v=15/g, "styles.css?v=16"],
  [/home\.css\?v=5/g, "home.css?v=10"],
  [/home\.css\?v=6/g, "home.css?v=10"],
  [/site-config\.js\?v=7/g, "site-config.js?v=8"],
  [/tracking\.js\?v=9/g, "tracking.js?v=10"],
  [/main\.js\?v=13/g, "main.js?v=14"],
  [/<body class="site-home">/, '<body class="site-home" data-market="mesa">'],
  [/Main Site/g, "Mesa Home"],
  [/href="\/"/g, 'href="/mesa"'],
  [/New lead — lets-wrench\.com/g, "New lead — lets-wrench.com (Check Engine Mesa)"],
]);
// Fix over-replace: "Mesa Home" for logo should go to /mesa - already did href="/" -> /mesa
// Logo aria might say Mesa incorrectly - fine
write("check-engine-light-mesa.html", cel);
console.log("Wrote check-engine-mesa");

// Ads Mesa from Omaha ads LP
let ads = read("mobile-mechanic.html");
ads = transform(ads, [
  [/Omaha/g, "Mesa"],
  [/omaha/g, "mesa"],
  [/https:\/\/lets-wrench\.com\/mobile-mechanic/g, "https://lets-wrench.com/ads-mesa"],
  [/\+15319996507/g, "+16236630873"],
  [/\(531\) 999-6507/g, "(623) 663-0873"],
  [/Nebraska/g, "Arizona"],
  [/greater Omaha/g, "the East Valley"],
  [/Greater Omaha/g, "East Valley"],
  [/Bellevue, Papillion, La Vista, Council Bluffs/g, "Gilbert, Chandler, Tempe, Queen Creek"],
  [/href="\/mobile-mechanic-bellevue"/g, 'href="/mobile-mechanic-gilbert"'],
  [/href="\/mobile-mechanic-papillion"/g, 'href="/mobile-mechanic-chandler"'],
  [/href="\/check-engine-light-omaha"/g, 'href="/check-engine-light-mesa"'],
  [/>Bellevue</g, ">Gilbert<"],
  [/>Papillion</g, ">Chandler<"],
  [/Also La Vista, Elkhorn, Council Bluffs/g, "Also Tempe, Queen Creek, Apache Junction"],
  [/styles\.css\?v=15/g, "styles.css?v=16"],
  [/home\.css\?v=9/g, "home.css?v=10"],
  [/site-config\.js\?v=7/g, "site-config.js?v=8"],
  [/tracking\.js\?v=9/g, "tracking.js?v=10"],
  [/main\.js\?v=13/g, "main.js?v=14"],
  [/data-ads-city="mesa"/g, 'data-ads-city="mesa"'],
  [/data-market="omaha"/g, 'data-market="mesa"'],
  [/<body class="site-home site-main lp-ads" data-ads-city="mesa">/, '<body class="site-home site-main lp-ads" data-market="mesa" data-ads-city="mesa">'],
  [/New lead — lets-wrench\.com \(mobile-mechanic\)/g, "New lead — lets-wrench.com (ads-mesa)"],
  [/41\.2565/g, "33.4152"],
  [/-95\.9345/g, "-111.8315"],
]);
// Ensure body has data-market
if (!ads.includes('data-market="mesa"')) {
  ads = ads.replace(
    '<body class="site-home site-main lp-ads"',
    '<body class="site-home site-main lp-ads" data-market="mesa"'
  );
}
write("ads-mesa.html", ads);
console.log("Wrote ads-mesa");
