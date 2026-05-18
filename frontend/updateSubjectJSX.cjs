/* eslint-disable */
const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, 'src', 'pages', 'Subject.jsx');
let content = fs.readFileSync(targetFilePath, 'utf-8');

const subjectPdfs = `const SUBJECT_PDFS = {
    "Primary 1": {
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/11314/mod_resource/content/1/Science%20and%20Elementary%20Science%20P1%20English%20version%20.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/10994/mod_resource/content/1/Social%20and%20Religious%20Studies%20P1%20English%20version%20.pdf",
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/176981/mod_resource/content/2/P1%20Mathematics%20PB%20%2C.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/45013/mod_resource/content/6/P1-English-PB%20..pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/10682/mod_resource/content/3/P1%20Kinyarwanda%20Student%20Book.pdf"
    },
    "Primary 2": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/179436/mod_resource/content/1/P2%20Mathematics%20PB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/11877/mod_resource/content/1/English%20P2%20.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/11837/mod_resource/content/1/IKINYARWANDA%20SB%20P2.pdf",
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/179443/mod_resource/content/1/P2-SET-PB.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/179440/mod_resource/content/2/P2-SST-PB.pdf"
    },
    "Primary 3": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/179489/mod_resource/content/1/P3%20Mathematics%20PB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/179485/mod_resource/content/1/P3-English-PB%20%281%29.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/118/KINYARWANDA%20P3%20SB.pdf",
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/14945/mod_resource/content/1/Science%20and%20Elementary%20Science%20P3%20%20Student%20Book.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/179501/mod_resource/content/1/P3-SST-PB.pdf"
    },
    "Primary 4": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/179540/mod_resource/content/1/P4%20Mathematics%20PB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/179535/mod_resource/content/2/P4-ENGLISH-PB%20%281%29.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/115/KINYARWANDA%20P4%20SB.pdf",
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/232366/mod_resource/content/2/P4-SET-PB.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/179543/mod_resource/content/2/P4-SST-PB%20%281%29%20%281%29.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/179554/mod_resource/content/1/P4-French-PB.pdf"
    },
    "Primary 5": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/15382/mod_resource/content/1/MATH%20P5%20SB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/40/English%20P5%20SB.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/112/Kinyarwanda%20P5%20SB.pdf",
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/232369/mod_resource/content/1/P5-SET-PB.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/179564/mod_resource/content/1/P5-SST-PB%20%282%29.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/15262/mod_resource/content/1/FRENCH%20P5%20SB.pdf"
    },
    "Primary 6": {
        "Mathematics": "https://drive.google.com/file/d/1KpSmPxFFOk0xqeXKFjzRV9aWfBe2GZIM/view?usp=sharing",
        "English": "https://elearning.reb.rw/pluginfile.php/179839/mod_resource/content/1/P6-ENGLISH-PB.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/88/kinyarwanda%20P6%20SB.pdf",
        "Elementary Science & Technology (SET)": "https://elearning.reb.rw/pluginfile.php/179856/mod_resource/content/1/P6-SET-PB.pdf",
        "Elementary Science & Technology": "https://elearning.reb.rw/pluginfile.php/179856/mod_resource/content/1/P6-SET-PB.pdf",
        "Social Studies": "https://elearning.reb.rw/pluginfile.php/179854/mod_resource/content/1/P6-SST-PB%20..pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/179864/mod_resource/content/1/P6-French-PB%20%281%29.pdf"
    },
    "Senior 1": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/86879/mod_resource/content/2/Mathematics-S1-SB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/47/English%20S1%20SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/57/Chemistry%20S1%20SB.pdf",
        "Physics": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/55/Physics%20S1%20SB.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/86291/mod_resource/content/1/Geography%20S1%20S.B.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/84696/mod_resource/content/2/HISTORY%20%20AND%20CITIZENSHIP%20STUDENT%20BOOK%20S1.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/9400/mod_resource/content/1/Entrepreneurship%20S1.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/85739/mod_resource/content/1/ICT%20S1%20SB.pdf"
    },
    "Senior 2": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/128/Mathematics%20S2%20SB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/126/English%20S2%20SB.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/79/Kinyarwanda%20%20S2%20SB.pdf",
        "Biology": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/138/Biology%20S2%20SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/11670/mod_resource/content/1/S3%20Chemistry%20SB.pdf",
        "Physics": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/132/Physics%20S2%20SB.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/10818/mod_resource/content/1/Geography%20and%20Environment%20S2%20SB.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/84702/mod_resource/content/1/HISTORY%20AND%20CITIZENSHIP%20STUDENT%20BOOK%20S2.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/10855/mod_resource/content/1/Entrepreneurship%20S2.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/10661/mod_resource/content/1/S2%20ICT%20SB.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/10142/mod_resource/content/1/French%20S2%20SB.pdf"
    },
    "Senior 3": {
        "English": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/28/ENGLISH%20SB%20S3_compressed%20%281%29.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/82/Kinyarwanda%20S3%20SB.pdf",
        "Biology": "https://elearning.reb.rw/pluginfile.php/11689/mod_resource/content/1/Biology%20S3%20SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/85875/mod_resource/content/1/GENERAL%20EDU-Chemistry-S3-SB.pdf",
        "Physics": "https://elearning.reb.rw/pluginfile.php/11635/mod_resource/content/2/S3%20Physics%20Student%20Book.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/86295/mod_resource/content/1/Geography%20S3%20SB.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/84705/mod_resource/content/1/S3%20HISTORY%20AND%20CITIZENSHIP%20SB.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/57077/mod_resource/content/1/Entrepreneurship%20SB%20Year%203.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/11698/mod_resource/content/1/ICT%20%20S3%20SB.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/11628/mod_resource/content/1/French%20%20S3%20SB.pdf",
        "Integrated Science": "https://elearning.reb.rw/pluginfile.php/25813/mod_resource/content/1/Integrated%20Sciences%20Y3%20LE%20%20SSETG.pdf",
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/86883/mod_resource/content/2/Mathematics-S3-SB.pdf"
    },
    "Senior 4": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/44795/mod_resource/content/1/Core%20Math%20S4%20SB.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/35937/mod_resource/content/1/English%20S4%20SB.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/86223/mod_resource/content/1/IKINYARWANDA%20S4%20SB.pdf",
        "Biology": "https://elearning.reb.rw/pluginfile.php/10666/mod_resource/content/1/Biology%20S4%20%20SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/5916/mod_resource/content/1/chemistry%20S4%20SB.pdf",
        "Physics": "https://elearning.reb.rw/pluginfile.php/88653/mod_resource/content/1/ANP-Physics-S4-SB.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/10641/mod_resource/content/1/Geography%20S4%20SB.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/84708/mod_resource/content/3/GENERAL%20EDU-History-S4-SB.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/45712/mod_resource/content/1/Entrepreneurship%20S4_SB.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/10826/mod_resource/content/1/Computer%20Science%20S4%20SB.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/5837/mod_resource/content/2/FRENCH%20S4%20LKK%20SB.pdf",
        "Economics": "https://elearning.reb.rw/pluginfile.php/10721/mod_resource/content/1/Economics%20S4%20SB.pdf",
        "General Studies & Communication": "https://elearning.reb.rw/pluginfile.php/86283/mod_resource/content/1/GENERAL%20EDU-GSCS-S4-SB.pdf"
    },
    "Senior 5": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/15666/mod_resource/content/1/MATH%20S5%20SB%20Core.pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/43797/mod_resource/content/2/English%20LB%20S.5.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/86224/mod_resource/content/1/IKINYARWANDA%20S5%20SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/11302/mod_resource/content/1/Chemistry%20S5%20SB.pdf",
        "Biology": "https://elearning.reb.rw/mod/resource/view.php?id=9291&redirect=1",
        "Physics": "https://elearning.reb.rw/pluginfile.php/192597/mod_resource/content/1/Physics_Students%20Book_Senior%20Five.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/11819/mod_resource/content/1/Geography%20S5%20SB.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/11928/mod_resource/content/1/HISTORY%20S5%20SB.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/42555/mod_resource/content/1/ENTREPRENEURSHIP%20S5%20SB.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/85872/mod_resource/content/1/FINAL%20COMPUTER%20SCIENCE%20S5%20WITH%20STAMP.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/47378/mod_resource/content/1/FRENCH%20S5%20EL%20SB%20%282%29.pdf",
        "Economics": "https://elearning.reb.rw/pluginfile.php/11938/mod_resource/content/1/Economics%20S5%20SB.pdf",
        "General Studies & Communication": "https://elearning.reb.rw/pluginfile.php/12066/mod_resource/content/1/General%20Studies%20and%20Comm.%20Skills%20S6%20SB.pdf"
    },
    "Senior 6": {
        "Mathematics": "https://elearning.reb.rw/pluginfile.php/14797/mod_resource/content/1/Core%20Math%20S6%20SB..pdf",
        "English": "https://elearning.reb.rw/pluginfile.php/11977/mod_resource/content/2/English%20S6%20SB.pdf",
        "Kinyarwanda": "https://elearning.reb.rw/pluginfile.php/1/block_exalib/item_file/93/Kinyarwanda%20Core%20S6%20SB.pdf",
        "Biology": "https://elearning.reb.rw/pluginfile.php/84790/mod_resource/content/2/ANP-Biology-S6-SB.pdf",
        "Chemistry": "https://elearning.reb.rw/pluginfile.php/11991/mod_resource/content/1/Chemistry%20S6%20SB.pdf",
        "Physics": "https://elearning.reb.rw/pluginfile.php/55344/mod_resource/content/2/ANP-Physics-S6-SB.pdf",
        "Geography": "https://elearning.reb.rw/pluginfile.php/38901/mod_resource/content/1/Geography%20SB%20S6.pdf",
        "History": "https://elearning.reb.rw/pluginfile.php/14925/mod_resource/content/1/HISTORY%20S6%20SB.pdf",
        "Entrepreneurship": "https://elearning.reb.rw/pluginfile.php/14757/mod_resource/content/1/Entrepreneurship%20S6%20SB.pdf",
        "Computer Science": "https://elearning.reb.rw/pluginfile.php/87372/mod_resource/content/1/Computer%20Science%20S6%20SB.pdf",
        "French": "https://elearning.reb.rw/pluginfile.php/11963/mod_resource/content/3/French%20S6%20SB%20LFK.pdf",
        "Economics": "https://elearning.reb.rw/pluginfile.php/14848/mod_resource/content/1/Economics%20S6%20SB.pdf",
        "General Studies & Communication": "https://elearning.reb.rw/pluginfile.php/12066/mod_resource/content/1/General%20Studies%20and%20Comm.%20Skills%20S6%20SB.pdf"
    }
};\\n`;

if (!content.includes('const SUBJECT_PDFS = {')) {
    content = content.replace('const Subject = () => {', subjectPdfs + '\\nconst Subject = () => {');
}

// Replace the rendering logic inside the mapping
// From line 193 to 226 in Subject.jsx there is a ternary logic.
const newRenderingString = \`
                                                {SUBJECT_PDFS[level]?.[subject] ? (
                                                    <>
                                                        <a 
                                                            href={SUBJECT_PDFS[level][subject]} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="btn btn-primary small-btn w-100 mb-2"
                                                            style={{ marginBottom: '10px' }}
                                                        >
                                                            {subject === "Kinyarwanda" ? "Soma igitabo" : "Open PDF"}
                                                        </a>
                                                        {((level === "Primary 1" && (subject === "Mathematics" || subject === "English" || subject === "Kinyarwanda")) || (level === "Senior 3" && subject === "Mathematics")) ? (
                                                            <button 
                                                                className="btn btn-secondary small-btn w-100"
                                                                onClick={() => setSelectedUnitSubject({ level, subject })}
                                                            >
                                                                {subject === "Kinyarwanda" ? "Kora isuzuma" : "Take Assessment"}
                                                            </button>
                                                        ) : (
                                                            <Link 
                                                                to={\`/assessment?level=\${encodeURIComponent(level)}&subject=\${encodeURIComponent(subject)}\`} 
                                                                className="btn btn-secondary small-btn w-100"
                                                            >
                                                                {subject === "Kinyarwanda" ? "Kora isuzuma" : "Take Assessment"}
                                                            </Link>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link 
                                                        to={\`/assessment?level=\${encodeURIComponent(level)}&subject=\${encodeURIComponent(subject)}\`} 
                                                        className="btn btn-primary small-btn w-100"
                                                    >
                                                        Start Assessment
                                                    </Link>
                                                )}
\`;

const oldRegex = /\\{\\s*\\(\\s*\\(level === "Primary 1"[^]*?<Link[^>]*>\\s*Start Assessment\\s*<\\/Link>\\s*\\)\\}/m;

content = content.replace(oldRegex, newRenderingString);

fs.writeFileSync(targetFilePath, content, 'utf-8');
console.log('Successfully updated Subject.jsx with PDFs');
