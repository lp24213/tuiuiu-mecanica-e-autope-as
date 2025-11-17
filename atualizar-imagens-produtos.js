// Script para atualizar todas as páginas com as imagens reais dos produtos
const fs = require('fs');
const path = require('path');

// Mapeamento dos produtos para os nomes dos arquivos reais
const produtosImagens = {
    'cuica-freio': 'cuica de freio.webp',
    'lona-freio': 'cuica de freio.webp', // Usar cuica como fallback
    'flexiveis-freios': 'fluido de freio dot 3.webp', // Usar fluido como fallback
    'borrachas-cuica': 'cuica de freio.webp',
    'rolamentos': 'rolamento.webp',
    'rolamento-cardan': 'rolamento do cardan.jpg',
    'cardan': 'cruzeta do cardan.jpg',
    'parafusos': 'parafusos.webp',
    'porcas': 'porca travante.webp',
    'arruelas': 'arruela lisa.webp',
    'parafusos-roda': 'parafuso de roda.webp',
    'porcas-roda': 'porca travante.webp',
    'capas-porcas': 'capa de porca.jpg',
    'arrebites': 'rebite_aluminio_3_16_x_3_8_c_cab_lentilha_16345_1_20200520155415.webp',
    'mola': 'mola.jpg',
    'grampos-molas': 'grampo de mola.jpg',
    'pneus-motos': 'pneu moto.jpg',
    'pneus-carros': 'pneu carro.jpg',
    'camaras-ar': 'pneu carro.jpg', // Fallback
    'bicos-pneus': 'pneu carro.jpg', // Fallback
    'insertos-pneus': 'pneu carro.jpg', // Fallback
    'remendos-pneus': 'pneu carro.jpg', // Fallback
    'filtros-ar': 'filtro de ar.jpg',
    'filtros-combustivel': 'filtro de combustivel.jpg',
    'filtros-oleo': 'filtro de oleo.jpg',
    'radiadores': 'mangueira de radiador.jpg', // Fallback
    'mangueiras-radiadores': 'mangueira de radiador.jpg',
    'aditivos-radiadores': 'mangueira de radiador.jpg', // Fallback
    'oleos-hidraulicos': 'oleo direção.webp',
    'graxas': 'graxa.webp',
    'mangueira-nylon': 'mangueira de nylon 8mm.webp',
    'correias': 'correia.jpg',
    'abracadeiras-aco': 'abraçadeira.jpg',
    'abracadeiras-nylon': 'abraçadeira.jpg',
    'engates-rapidos': 'abraçadeira.jpg', // Fallback
    'retentores': 'retentor do cubo.jpg',
    'travas-aranhas': 'trava aranha.jpg',
    'parabrisas': 'paleta de carro.jpg',
    'paralama': 'paralama.webp',
    'limpadores-vidros': 'paleta de carro.jpg',
    'ponteiras-escape': 'parabarro caminhao.webp',
    'interclimas': 'desengripante.webp', // Fallback
    'desengripantes': 'desengripante.webp',
    'limpa-contatos': 'limpa contato.jpg',
    'colas-3m': 'cola 3m.webp',
    'silicones-neutros': 'cola 3m.webp', // Fallback
    'silicones-grey': 'cola 3m.webp', // Fallback
    'silicones-pretos': 'cola 3m.webp', // Fallback
};

const imagesDir = path.join(__dirname, 'images');
const produtosDir = path.join(__dirname, 'produtos');

// Função para atualizar uma página de produto
function updateProductPage(slug, imgFile) {
    const filePath = path.join(produtosDir, `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    const imgPath = `../images/${imgFile}`;
    
    // Atualizar imagem de fundo
    content = content.replace(
        /(<img src=")[^"]*(" alt="[^"]*"[\s\S]*?class="product-bg-img")/g,
        `$1${imgPath}$2`
    );
    
    // Atualizar imagem principal
    content = content.replace(
        /(<img src=")[^"]*(" alt="[^"]*"[\s\S]*?onerror="this\.onerror=null; this\.src='\.\.\/images\/produtos\/[^']+';">)/g,
        `$1${imgPath}$2`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${slug}.html → ${imgFile}`);
}

// Atualizar produtos.html
function updateProdutosHtml() {
    const filePath = path.join(__dirname, 'produtos.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    Object.keys(produtosImagens).forEach(slug => {
        const imgFile = produtosImagens[slug];
        const imgPath = `./images/${imgFile}`;
        
        // Verificar se o arquivo existe
        const fullPath = path.join(imagesDir, imgFile);
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  Arquivo não encontrado: ${imgFile}`);
            return;
        }
        
        // Atualizar imagens no produtos.html
        const pattern = new RegExp(
            `(<img src=")[^"]*(" alt="[^"]*"[^>]*onerror="this\\.onerror=null; this\\.src='\\./images/produtos/${slug}\\.jpg';")`,
            'g'
        );
        
        content = content.replace(pattern, `$1${imgPath}$2`);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ produtos.html atualizado');
}

// Executar atualizações
console.log('🔄 Atualizando todas as páginas com imagens reais...\n');

Object.keys(produtosImagens).forEach(slug => {
    const imgFile = produtosImagens[slug];
    const fullPath = path.join(imagesDir, imgFile);
    
    if (fs.existsSync(fullPath)) {
        updateProductPage(slug, imgFile);
    } else {
        console.log(`⚠️  ${slug}: arquivo ${imgFile} não encontrado`);
    }
});

updateProdutosHtml();

console.log('\n✅ Todas as páginas foram atualizadas com as imagens reais!');

