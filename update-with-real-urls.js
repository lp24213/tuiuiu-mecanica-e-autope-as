// Script para atualizar todas as páginas com URLs reais de produtos
// Edite este arquivo e adicione as URLs reais de cada produto
const fs = require('fs');
const path = require('path');

// ============================================
// ADICIONE AS URLs REAIS DE CADA PRODUTO AQUI
// ============================================
const produtosImagensReais = {
    'cuica-freio': '', // Exemplo: 'https://http2.mlstatic.com/D_NQ_NP_XXXXXX-MLBXXXXXXXXX_XXXXXX-F.webp'
    'lona-freio': '',
    'flexiveis-freios': '',
    'borrachas-cuica': '',
    'rolamentos': '',
    'rolamento-cardan': '',
    'cardan': '',
    'parafusos': '',
    'porcas': '',
    'arruelas': '',
    'parafusos-roda': '',
    'porcas-roda': '',
    'capas-porcas': '',
    'arrebites': '',
    'mola': '',
    'grampos-molas': '',
    'pneus-motos': '',
    'pneus-carros': '',
    'camaras-ar': '',
    'bicos-pneus': '',
    'insertos-pneus': '',
    'remendos-pneus': '',
    'filtros-ar': '',
    'filtros-combustivel': '',
    'filtros-oleo': '',
    'radiadores': '',
    'mangueiras-radiadores': '',
    'aditivos-radiadores': '',
    'oleos-hidraulicos': '',
    'graxas': '',
    'mangueira-nylon': '',
    'correias': '',
    'abracadeiras-aco': '',
    'abracadeiras-nylon': '',
    'engates-rapidos': '',
    'retentores': '',
    'travas-aranhas': '',
    'parabrisas': '',
    'paralama': '',
    'limpadores-vidros': '',
    'ponteiras-escape': '',
    'interclimas': '',
    'desengripantes': '',
    'limpa-contatos': '',
    'colas-3m': '',
    'silicones-neutros': '',
    'silicones-grey': '',
    'silicones-pretos': '',
};

// Função para atualizar uma página de produto
function updateProductPage(slug, imgUrl) {
    const filePath = path.join(__dirname, 'produtos', `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Se tiver URL real, usar ela, senão usar imagem local
    const finalUrl = imgUrl || `../images/produtos/${slug}.jpg`;
    
    // Atualizar imagem de fundo
    content = content.replace(
        /(<img src=")[^"]*(" alt="[^"]*"[\s\S]*?class="product-bg-img")/g,
        `$1${finalUrl}$2`
    );
    
    // Atualizar imagem principal
    content = content.replace(
        /(<img src=")[^"]*(" alt="[^"]*"[\s\S]*?onerror="this\.onerror=null; this\.src='\.\.\/images\/produtos\/[^']+';">)/g,
        `$1${finalUrl}$2`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
}

// Atualizar produtos.html
function updateProdutosHtml() {
    const filePath = path.join(__dirname, 'produtos.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    Object.keys(produtosImagensReais).forEach(slug => {
        const imgUrl = produtosImagensReais[slug] || `./images/produtos/${slug}.jpg`;
        
        // Atualizar imagens no produtos.html
        const pattern = new RegExp(
            `(<img src=")[^"]*(" alt="[^"]*"[^>]*onerror="this\\.onerror=null; this\\.src='\\./images/produtos/${slug}\\.jpg';")`,
            'g'
        );
        
        content = content.replace(pattern, `$1${imgUrl}$2`);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
}

// Executar atualizações
console.log('🔄 Atualizando imagens de produtos...\n');

Object.keys(produtosImagensReais).forEach(slug => {
    const imgUrl = produtosImagensReais[slug];
    if (imgUrl) {
        updateProductPage(slug, imgUrl);
        console.log(`✓ ${slug}: URL real adicionada`);
    } else {
        updateProductPage(slug, null);
        console.log(`⚠ ${slug}: usando imagem local (adicione URL real no arquivo)`);
    }
});

updateProdutosHtml();
console.log('\n✅ Atualização concluída!');
console.log('\n📝 Para adicionar URLs reais:');
console.log('   1. Edite o arquivo update-with-real-urls.js');
console.log('   2. Adicione as URLs reais de cada produto');
console.log('   3. Execute: node update-with-real-urls.js');

