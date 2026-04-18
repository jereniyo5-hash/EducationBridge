const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Subject.jsx';
let content = fs.readFileSync(path, 'utf8');

const kinyarwandaUnits = `
const P1_KINYARWANDA_UNITS = [
    "Umutwe wa mbere: Umuco n’indangagaciro",
    "Umutwe wa kabiri: Isuku",
    "Umutwe wa gatatu: Umuryango",
    "Umutwe wa kane: Ibidukikije",
    "Umutwe wa gatanu: Uburenganzira bw’umwana",
    "Umutwe wa gatandatu: Kwirinda no gukumira ihohoterwa",
    "Umutwe wa karindwi: Inyamaswa zo mu rugo",
    "Umutwe wa munani: Indyo yuzuye",
    "Umutwe wa kenda: Kuzigama"
];
`;

if (!content.includes('P1_KINYARWANDA_UNITS')) {
    content = content.replace('const P1_MATH_UNITS = [', kinyarwandaUnits + '\nconst P1_MATH_UNITS = [');
}

let oldKinCard = `            <div className="subject-card kinyarwanda">
              <div className="subject-icon">📝</div>
              <h3>Kinyarwanda</h3>
              <p>Ubuvanganzo, Ikinyarwanda cyiza no kwandika</p>
              <div className="subject-stats">
                <span>9 Topics</span>
                <span>14 Exercises</span>
              </div>
            </div>`;

let oldKinCardAlternative = `              <div className="subject-card kinyarwanda">
                <div className="subject-icon">📝</div>
                <h3>Kinyarwanda</h3>
                <p>Ubuvanganzo, Ikinyarwanda cyiza no kwandika</p>
                <div className="subject-stats">
                  <span>9 Topics</span>
                  <span>14 Exercises</span>
                </div>
              </div>`;

let newKinCard = `              <div className="subject-card kinyarwanda">
                <div className="subject-icon">📝</div>
                <h3>Kinyarwanda</h3>
                <p>Ubuvanganzo, Ikinyarwanda cyiza no kwandika</p>
                <div className="subject-stats">
                  <span>9 Topics</span>
                  <span>14 Exercises</span>
                </div>
                <div className="btn-group" style={{ 
                  display: "flex", 
                  gap: "10px", 
                  marginTop: "1.5rem" 
                }}>
                  <a 
                    href="https://elearning.reb.rw/pluginfile.php/10682/mod_resource/content/3/P1%20Kinyarwanda%20Student%20Book.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ flex: 1, padding: "0.8rem", textAlign: "center", textDecoration: "none" }}
                  >
                    Open PDF
                  </a>
                  <button 
                    className="btn btn-primary"
                    style={{ flex: 1, padding: "0.8rem" }}
                    onClick={() => handleTakeAssessment('Primary 1', 'Kinyarwanda')}
                  >
                    Take Assessment
                  </button>
                </div>
              </div>`;

if (content.includes('Ubuvanganzo, Ikinyarwanda cyiza no kwandika')) {
    let index1 = content.indexOf('<div className="subject-card kinyarwanda">');
    if (index1 !== -1) {
        let regex = /<div className="subject-card kinyarwanda">[\s\S]*?<\/div>\s*<\/div>/;
        content = content.replace(regex, newKinCard);
    }
}

if (!content.includes('P1_KINYARWANDA_UNITS);')) {
    content = content.replace(
      "const units = selectedSubject.subject === 'Mathematics' ? P1_MATH_UNITS : P1_ENGLISH_UNITS;",
      "const units = selectedSubject.subject === 'Mathematics' ? P1_MATH_UNITS : (selectedSubject.subject === 'English' ? P1_ENGLISH_UNITS : P1_KINYARWANDA_UNITS);"
    );
}

fs.writeFileSync(path, content, 'utf8');
console.log('Updated Subject.jsx');
