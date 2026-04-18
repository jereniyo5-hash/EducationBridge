const fs = require('fs');
const path = 'd:/Documents/HTML FILE/my pr/benit/src/pages/Assessment.jsx';
let content = fs.readFileSync(path, 'utf8');

const componentsToInject = `
const DrawingPad = ({ id }) => {
    const canvasRef = React.useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        // Initialize canvas context style
        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        if(e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault(); // prevent scrolling while drawing on touch
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        if(e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#6A5ACD', marginBottom: '0.5rem' }}><i className="uil uil-pen"></i> Scratchpad: Draw your Venn Diagram</p>
            <div style={{ border: '3px dashed #cbd5e1', borderRadius: '10px', background: '#f8fafc', overflow: 'hidden' }}>
                <canvas 
                    ref={canvasRef}
                    width={400}
                    height={250}
                    style={{ display: 'block', touchAction: 'none', cursor: 'crosshair' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
            </div>
            <button className="btn btn-outline small-btn" onClick={clearCanvas} style={{ marginTop: '0.8rem' }}>Clear Drawing</button>
        </div>
    );
};

const VennDiagramQ7 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic', marginBottom: '0.5rem' }}>Fig. 1.11</p>
            <svg width="350" height="180" viewBox="0 0 350 180" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                <rect x="10" y="10" width="330" height="160" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
                <circle cx="130" cy="90" r="60" fill="rgba(100, 149, 237, 0.2)" stroke="#1e293b" strokeWidth="2" />
                <circle cx="220" cy="90" r="60" fill="rgba(255, 127, 80, 0.2)" stroke="#1e293b" strokeWidth="2" />
                <text x="60" y="45" fontSize="20" fill="#0f172a" fontWeight="bold">A</text>
                <text x="280" y="45" fontSize="20" fill="#0f172a" fontWeight="bold">B</text>
                <text x="170" y="96" fontSize="22" fill="#0f172a" fontStyle="italic" fontWeight="bold">x</text>
            </svg>
        </div>
    );
};

const Senior3MathUnit1Exam`;

// Replace `const Senior3MathUnit1Exam` with the injected components
content = content.replace('const Senior3MathUnit1Exam', componentsToInject);

// Now string inject the conditionals inside the specific mapping of questions.
const qMapReplacement = `
                            </h3>
                            {['q1', 'q2', 'q3', 'q5', 'q6', 'q8'].includes(q.id) && <DrawingPad id={q.id} />}
                            {q.id === 'q7' && <VennDiagramQ7 />}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
`;

content = content.replace(
    `</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>`,
    qMapReplacement
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected DrawingPad and SVG elements for Senior 3 Math Unit 1.');
