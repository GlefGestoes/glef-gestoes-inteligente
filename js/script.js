// =========================================
// CONTROLE DO MENU HAMBÚRGUER
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Fechar menu ao clicar em link (mobile)
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
});

// =========================================
// FORMULÁRIO DE ORÇAMENTO
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            alert('Obrigado por sua mensagem! Entraremos em contato em breve.');
            this.reset();
            btn.innerText = originalText;
            btn.style.opacity = '1';
        }, 1500);
    });
}

// =========================================
// SMOOTH SCROLL COM CENTRALIZAÇÃO INTELIGENTE
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            let offsetPosition;

            if (window.innerWidth >= 992) {
                const windowHeight = window.innerHeight;
                const elementHeight = targetElement.offsetHeight;
                offsetPosition = elementPosition - ((windowHeight - elementHeight) / 2);
                if (elementHeight > windowHeight) {
                    offsetPosition = elementPosition - headerOffset;
                }
            } else {
                offsetPosition = elementPosition - headerOffset;
            }

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// =========================================
// ACTIVE LINK NA NAVEGAÇÃO + NAVBAR SCROLL
// =========================================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.padding = '15px 0';
            nav.style.backgroundColor = 'rgba(17, 18, 20, 0.95)';
        }
    }
});

// =========================================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// =========================================
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-center').forEach(el => {
    revealOnScroll.observe(el);
});

// =========================================
// ABAS DAS CALCULADORAS
// =========================================
document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove active de todas as abas e painéis
        document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));

        // Ativa a aba clicada
        this.classList.add('active');
        const targetPanel = document.getElementById('tab-' + this.dataset.tab);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

// =========================================
// UTILITÁRIOS COMPARTILHADOS
// =========================================

/** Formata número para BRL */
function formatBRL(v) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// =========================================
// CALCULADORA 1 — SIMPLES NACIONAL
// =========================================

const TABELAS_SN = {
    ANEXO_3: [
        { limite: 180000,  aliq: 0.06,  deducao: 0,      part: { irpj: 0.04,  csll: 0.035, cofins: 0.1282, pis: 0.0278, cpp: 0.434, iss: 0.335 } },
        { limite: 360000,  aliq: 0.112, deducao: 9360,   part: { irpj: 0.04,  csll: 0.035, cofins: 0.1405, pis: 0.0305, cpp: 0.434, iss: 0.32  } },
        { limite: 720000,  aliq: 0.135, deducao: 17640,  part: { irpj: 0.04,  csll: 0.035, cofins: 0.1364, pis: 0.0296, cpp: 0.434, iss: 0.325 } },
        { limite: 1800000, aliq: 0.16,  deducao: 35640,  part: { irpj: 0.04,  csll: 0.035, cofins: 0.1364, pis: 0.0296, cpp: 0.434, iss: 0.325 } },
        { limite: 3600000, aliq: 0.21,  deducao: 125640, part: { irpj: 0.04,  csll: 0.035, cofins: 0.1282, pis: 0.0278, cpp: 0.434, iss: 0.335 } },
        { limite: 4800000, aliq: 0.33,  deducao: 648000, part: { irpj: 0.35,  csll: 0.15,  cofins: 0.1603, pis: 0.0347, cpp: 0.305, iss: 0     } }
    ],
    ANEXO_5: [
        { limite: 180000,  aliq: 0.155, deducao: 0,      part: { irpj: 0.25,  csll: 0.15,  cofins: 0.141,  pis: 0.0305, cpp: 0.2885, iss: 0.14 } },
        { limite: 360000,  aliq: 0.18,  deducao: 4500,   part: { irpj: 0.23,  csll: 0.15,  cofins: 0.141,  pis: 0.0305, cpp: 0.2785, iss: 0.17 } },
        { limite: 720000,  aliq: 0.19,  deducao: 9900,   part: { irpj: 0.24,  csll: 0.15,  cofins: 0.1492, pis: 0.0323, cpp: 0.2385, iss: 0.19 } },
        { limite: 1800000, aliq: 0.205, deducao: 17100,  part: { irpj: 0.25,  csll: 0.15,  cofins: 0.141,  pis: 0.0305, cpp: 0.2385, iss: 0.19 } },
        { limite: 3600000, aliq: 0.23,  deducao: 62100,  part: { irpj: 0.23,  csll: 0.15,  cofins: 0.141,  pis: 0.0305, cpp: 0.2385, iss: 0.21 } },
        { limite: 4800000, aliq: 0.305, deducao: 540000, part: { irpj: 0.35,  csll: 0.15,  cofins: 0.1603, pis: 0.0347, cpp: 0.305,  iss: 0    } }
    ],
    ANEXO_1: [
        { limite: 180000,  aliq: 0.04,  deducao: 0,      part: { irpj: 0.055, csll: 0.035, cofins: 0.1274, pis: 0.0276, cpp: 0.415, icms: 0.34  } },
        { limite: 360000,  aliq: 0.073, deducao: 5940,   part: { irpj: 0.055, csll: 0.035, cofins: 0.1274, pis: 0.0276, cpp: 0.415, icms: 0.34  } },
        { limite: 720000,  aliq: 0.095, deducao: 13860,  part: { irpj: 0.055, csll: 0.035, cofins: 0.1274, pis: 0.0276, cpp: 0.41,  icms: 0.335 } },
        { limite: 1800000, aliq: 0.107, deducao: 22500,  part: { irpj: 0.055, csll: 0.035, cofins: 0.1274, pis: 0.0276, cpp: 0.42,  icms: 0.335 } },
        { limite: 3600000, aliq: 0.143, deducao: 87300,  part: { irpj: 0.055, csll: 0.035, cofins: 0.1274, pis: 0.0276, cpp: 0.42,  icms: 0.335 } },
        { limite: 4800000, aliq: 0.19,  deducao: 378000, part: { irpj: 0.135, csll: 0.10,  cofins: 0.2827, pis: 0.0613, cpp: 0.421, icms: 0     } }
    ]
};

function snMascaraMoeda(el) {
    let v = el.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',').replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,').replace(/(\d)(\d{3}),/g, '$1.$2,');
    el.value = 'R$ ' + v;
}

function snParseMoney(v) {
    return parseFloat(v.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

function snToggleInputs() {
    const tipo = document.getElementById('sn_tipo').value;
    document.getElementById('sec_servico').style.display  = (tipo === 'servico' || tipo === 'ambos') ? 'block' : 'none';
    document.getElementById('sec_comercio').style.display = (tipo === 'comercio' || tipo === 'ambos') ? 'block' : 'none';
    document.getElementById('fator_r_container').style.display = (tipo === 'servico' || tipo === 'ambos') ? 'block' : 'none';
}

function snToggleFatorR() {
    document.getElementById('inputs_fator_r').style.display = document.getElementById('chk_fator_r').checked ? 'flex' : 'none';
}

function snProcessar(titulo, rbt12, faturamento, tabela, impostoLocal, folha12 = 0) {
    let faixaIndex = tabela.findIndex(f => rbt12 <= f.limite);
    if (faixaIndex === -1) faixaIndex = tabela.length - 1;
    const faixa = tabela[faixaIndex];

    const valorBaseDeducao = rbt12 * faixa.aliq;
    const valorDeduzidoCalculado = valorBaseDeducao - faixa.deducao;
    const aliqEfetiva = rbt12 > 0 ? (valorDeduzidoCalculado / rbt12) : 0;

    let alertaHtml = '';
    if (folha12 > 0 && rbt12 > 0) {
        const proporcao = folha12 / rbt12;
        if (proporcao >= 0.26 && proporcao < 0.28) {
            alertaHtml = `<div class="alert-fator">⚠️ Atenção: Seu Fator-R está em ${(proporcao * 100).toFixed(2)}%. Muito próximo do limite de 28%!</div>`;
        }
    }

    let rows = '';
    let totalPagar = 0;
    ['irpj', 'csll', 'cofins', 'pis', 'cpp', impostoLocal].forEach(imp => {
        const part = faixa.part[imp] || 0;
        const vPagar = faturamento * (aliqEfetiva * part);
        totalPagar += vPagar;
        rows += `<tr>
            <td>${imp.toUpperCase()}</td>
            <td>${(faixa.aliq * 100).toFixed(2)}%</td>
            <td>${(part * 100).toFixed(2)}%</td>
            <td>${(aliqEfetiva * part * 100).toFixed(2)}%</td>
            <td>${formatBRL(vPagar)}</td>
        </tr>`;
    });

    return {
        total: totalPagar,
        html: `
        <div class="sn-memoria-box">
            <h3 style="text-align:center;">Detalhamento — ${titulo}</h3>
            ${alertaHtml}
            <div class="sn-step"><span>Faixa da Tabela:</span> <b>${faixaIndex + 1}ª Faixa</b></div>
            <div class="sn-step"><span>Receita Bruta Acumulada (RBT12):</span> <b>${formatBRL(rbt12)}</b></div>
            <div class="sn-step"><span>Alíquota Nominal da Faixa:</span> <b>${(faixa.aliq * 100).toFixed(2)}%</b></div>
            <div class="sn-step"><span>Base de Cálculo (RBT12 × Alíq. Nom):</span> <b>${formatBRL(valorBaseDeducao)}</b></div>
            <div class="sn-step"><span>Valor da Dedução da Faixa:</span> <b>${formatBRL(faixa.deducao)}</b></div>
            <div class="sn-step"><span>Valor Deduzido (BC − Dedução):</span> <b>${formatBRL(valorDeduzidoCalculado)}</b></div>
            <div class="sn-step"><span>Alíquota Efetiva (Valor Deduzido / RBT12):</span> <b style="color:var(--pink);">${(aliqEfetiva * 100).toFixed(2)}%</b></div>
            <table class="sn-table">
                <thead><tr><th>Tributo</th><th>Alíq. Nom.</th><th>% Part.</th><th>Alíq. Ef. Trib.</th><th>A Pagar</th></tr></thead>
                <tbody>${rows}</tbody>
                <tfoot><tr class="sn-total-destaque"><td colspan="4">TOTAL DO MÊS</td><td>${formatBRL(totalPagar)}</td></tr></tfoot>
            </table>
        </div>`
    };
}

function snCalcularTudo() {
    const tipo = document.getElementById('sn_tipo').value;
    const usaFatorR = document.getElementById('chk_fator_r').checked;
    let htmlFinal = '';
    let somaTotal = 0;

    if (tipo === 'servico' || tipo === 'ambos') {
        const rbt12  = snParseMoney(document.getElementById('sn_rbt12_serv').value);
        const fatMes = snParseMoney(document.getElementById('sn_fat_mes_serv').value);
        const folha12 = snParseMoney(document.getElementById('sn_folha12').value);
        let tab = TABELAS_SN.ANEXO_3;
        let nome = 'Serviço (Anexo III)';

        if (usaFatorR) {
            if (rbt12 > 0 && (folha12 / rbt12) < 0.28) {
                tab = TABELAS_SN.ANEXO_5;
                nome = 'Serviço (Anexo V)';
            } else {
                nome = 'Serviço (Anexo III — Fator R cumprido)';
            }
        }
        const res = snProcessar(nome, rbt12, fatMes, tab, 'iss', folha12);
        htmlFinal += res.html;
        somaTotal += res.total;
    }

    if (tipo === 'comercio' || tipo === 'ambos') {
        const rbt12  = snParseMoney(document.getElementById('sn_rbt12_com').value);
        const fatMes = snParseMoney(document.getElementById('sn_fat_mes_com').value);
        const res = snProcessar('Comércio (Anexo I)', rbt12, fatMes, TABELAS_SN.ANEXO_1, 'icms');
        htmlFinal += res.html;
        somaTotal += res.total;
    }

    if (tipo === 'ambos') {
        htmlFinal += `<div class="sn-total-destaque" style="padding:20px; text-align:center; margin-top:20px; border-radius:10px;">
            TOTAL GERAL SIMPLES NACIONAL: ${formatBRL(somaTotal)}
        </div>`;
    }

    document.getElementById('sn_resultado_final').innerHTML = htmlFinal;
}

function snResetar() {
    document.querySelectorAll('#sn-calc-container .sn-calc-input').forEach(i => i.value = '');
    document.getElementById('sn_resultado_final').innerHTML = '';
    document.getElementById('chk_fator_r').checked = false;
    snToggleFatorR();
}

// =========================================
// CALCULADORA 2 — LUCRO PRESUMIDO
// =========================================

function lpMascaraMoeda(campo) {
    let valor = campo.value.replace(/\D/g, '');
    if (valor === '') valor = '0';
    valor = (parseInt(valor, 10) / 100).toFixed(2) + '';
    valor = valor.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    campo.value = valor;
}

function lpGetVal(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    // Verifica se o elemento ou seu pai está oculto
    let node = el;
    while (node && node !== document.body) {
        if (node.style && node.style.display === 'none') return 0;
        node = node.parentElement;
    }
    const valorString = (el.value || '0').replace(/\./g, '').replace(',', '.');
    return parseFloat(valorString) || 0;
}

function lpFormar(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function lpAlternarCampos() {
    const tipo = document.getElementById('calc-tipo').value;
    const checkDev = document.getElementById('check-devolucoes').checked;
    const checkRet = document.getElementById('check-retencoes').checked;

    document.getElementById('grupo-comercio').style.display = (tipo === 'comercio' || tipo === 'ambos') ? 'block' : 'none';
    document.getElementById('grupo-servico').style.display  = (tipo === 'servico'  || tipo === 'ambos') ? 'block' : 'none';

    document.getElementById('grupo-devolucoes').style.display = checkDev ? 'block' : 'none';
    if (checkDev) {
        document.getElementById('dev-comercio-div').style.display = (tipo === 'comercio' || tipo === 'ambos') ? 'block' : 'none';
        document.getElementById('dev-servico-div').style.display  = (tipo === 'servico'  || tipo === 'ambos') ? 'block' : 'none';
    }

    document.getElementById('grupo-retencoes').style.display = checkRet ? 'flex' : 'none';
}

function lpLimparCampos() {
    document.querySelectorAll('#calculadora-lucro-presumido input[type="text"]').forEach(i => i.value = '0,00');
    document.querySelectorAll('#calculadora-lucro-presumido input[type="checkbox"]').forEach(c => c.checked = false);
    document.getElementById('calc-resultados').style.display = 'none';
    lpAlternarCampos();
}

function lpCalcularImpostos() {
    const tipo   = document.getElementById('calc-tipo').value;
    const temDev = document.getElementById('check-devolucoes').checked;

    // Comércio
    const brutoCom = (tipo === 'comercio' || tipo === 'ambos') ? (lpGetVal('com-m1') + lpGetVal('com-m2') + lpGetVal('com-m3')) : 0;
    const devCom   = temDev ? lpGetVal('dev-comercio') : 0;
    const liqCom   = Math.max(0, brutoCom - devCom);
    const baseIrpjCom = liqCom * 0.08;
    const baseCsllCom = liqCom * 0.12;

    // Serviço
    const brutoSrv = (tipo === 'servico' || tipo === 'ambos') ? (lpGetVal('srv-m1') + lpGetVal('srv-m2') + lpGetVal('srv-m3')) : 0;
    const devSrv   = temDev ? lpGetVal('dev-servico') : 0;
    const liqSrv   = Math.max(0, brutoSrv - devSrv);
    const baseIrpjSrv = liqSrv * 0.32;
    const baseCsllSrv = liqSrv * 0.32;

    // Totais
    const baseIrpjTotal = baseIrpjCom + baseIrpjSrv;
    const baseCsllTotal = baseCsllCom + baseCsllSrv;

    // IRPJ
    const irpj15   = baseIrpjTotal * 0.15;
    const addIrpj  = baseIrpjTotal > 60000 ? (baseIrpjTotal - 60000) * 0.10 : 0;
    const retIrpj  = lpGetVal('ret-irpj');
    const irpjFinal = Math.max(0, irpj15 + addIrpj - retIrpj);

    // CSLL
    const csll9    = baseCsllTotal * 0.09;
    const retCsll  = lpGetVal('ret-csll');
    const csllFinal = Math.max(0, csll9 - retCsll);

    // Atualiza interface
    document.getElementById('res-bloco-comercio').style.display = brutoCom > 0 ? 'block' : 'none';
    document.getElementById('res-bloco-servico').style.display  = brutoSrv > 0 ? 'block' : 'none';

    document.getElementById('r-com-bruto').innerText       = lpFormar(brutoCom);
    document.getElementById('r-com-dev').innerText         = lpFormar(devCom);
    document.getElementById('r-com-liq').innerText         = lpFormar(liqCom);
    document.getElementById('r-com-base-irpj').innerText   = lpFormar(baseIrpjCom);
    document.getElementById('r-com-base-csll').innerText   = lpFormar(baseCsllCom);

    document.getElementById('r-srv-bruto').innerText       = lpFormar(brutoSrv);
    document.getElementById('r-srv-dev').innerText         = lpFormar(devSrv);
    document.getElementById('r-srv-liq').innerText         = lpFormar(liqSrv);
    document.getElementById('r-srv-base-irpj').innerText   = lpFormar(baseIrpjSrv);
    document.getElementById('r-srv-base-csll').innerText   = lpFormar(baseCsllSrv);

    document.getElementById('res-base-total-irpj').innerText = lpFormar(baseIrpjTotal);
    document.getElementById('res-irpj-15').innerText          = lpFormar(irpj15);
    document.getElementById('res-irpj-add').innerText         = lpFormar(addIrpj);
    document.getElementById('res-irpj-ret').innerText         = lpFormar(retIrpj);
    document.getElementById('res-total-irpj').innerText       = lpFormar(irpjFinal);

    document.getElementById('res-base-total-csll').innerText  = lpFormar(baseCsllTotal);
    document.getElementById('res-csll-9').innerText           = lpFormar(csll9);
    document.getElementById('res-csll-ret').innerText         = lpFormar(retCsll);
    document.getElementById('res-total-csll').innerText       = lpFormar(csllFinal);

    document.getElementById('calc-resultados').style.display = 'block';
    window.scrollTo({ top: document.getElementById('calc-resultados').offsetTop, behavior: 'smooth' });
}

// =========================================
// CALCULADORA 3 — LUCRO REAL
// =========================================

function lrMascaraMoeda(el) {
    let v = el.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',').replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,').replace(/(\d)(\d{3}),/g, '$1.$2,');
    el.value = 'R$ ' + v;
}

function lrMoneyToFloat(v) {
    if (!v) return 0;
    return parseFloat(v.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) || 0;
}

function lrCalcularImpostos() {
    const lucro              = lrMoneyToFloat(document.getElementById('calc_lucro').value);
    const tetoAdicional      = parseFloat(document.getElementById('calc_periodo').value);
    const prejuizoInformado  = lrMoneyToFloat(document.getElementById('calc_prejuizo').value);
    const retIRPJ            = lrMoneyToFloat(document.getElementById('calc_ret_irpj').value);
    const retCSLL            = lrMoneyToFloat(document.getElementById('calc_ret_csll').value);

    // 1. Compensação de Prejuízo (Trava de 30%)
    const limiteCompensacao  = lucro * 0.30;
    const prejuizoCompensado = Math.min(prejuizoInformado, limiteCompensacao);
    const baseCalculo        = lucro - prejuizoCompensado;

    // 2. IRPJ
    const irpjBase     = baseCalculo * 0.15;
    const irpjAdicional = baseCalculo > tetoAdicional ? (baseCalculo - tetoAdicional) * 0.10 : 0;
    const irpjDevido   = irpjBase + irpjAdicional;
    const irpjFinal    = irpjDevido - retIRPJ;

    // 3. CSLL
    const csllDevido = baseCalculo * 0.09;
    const csllFinal  = csllDevido - retCSLL;

    const tbody = document.getElementById('calc-result-body');
    tbody.innerHTML = `
        <tr><td>Lucro Líquido Informado</td><td style="text-align:right">${formatBRL(lucro)}</td></tr>
        <tr><td>Compensação de Prejuízos (30%)</td><td style="text-align:right">(-) ${formatBRL(prejuizoCompensado)}</td></tr>
        <tr><td><strong>Base de Cálculo Líquida</strong></td><td style="text-align:right"><strong>${formatBRL(baseCalculo)}</strong></td></tr>
        <tr><td>IRPJ Base (15%)</td><td style="text-align:right">${formatBRL(irpjBase)}</td></tr>
        <tr><td>IRPJ Adicional (10% sobre o que excede ${formatBRL(tetoAdicional)})</td><td style="text-align:right">${formatBRL(irpjAdicional)}</td></tr>
        <tr><td>Retenções de IRPJ</td><td style="text-align:right">(-) ${formatBRL(retIRPJ)}</td></tr>
        <tr><td><strong class="res-destaque">VALOR DO IRPJ A PAGAR</strong></td><td style="text-align:right"><strong class="res-destaque">${formatBRL(Math.max(0, irpjFinal))}</strong></td></tr>
        <tr><td>CSLL Devida (9%)</td><td style="text-align:right">${formatBRL(csllDevido)}</td></tr>
        <tr><td>Retenções de CSLL</td><td style="text-align:right">(-) ${formatBRL(retCSLL)}</td></tr>
        <tr><td><strong class="res-destaque">VALOR DA CSLL A PAGAR</strong></td><td style="text-align:right"><strong class="res-destaque">${formatBRL(Math.max(0, csllFinal))}</strong></td></tr>
    `;

    document.getElementById('calc-result-table').style.display = 'table';
}

function lrResetarCalculo() {
    document.querySelectorAll('#calc-irpj-container .calc-input').forEach(input => input.value = '');
    document.getElementById('calc-result-table').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================
// CALCULADORA 4 — COMPARATIVO TRIBUTÁRIO
// =========================================

function compMascaraMoeda(el) {
    let v = el.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',').replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,').replace(/(\d)(\d{3}),/g, '$1.$2,');
    el.value = 'R$ ' + v;
}

function compParseM(v) {
    return parseFloat((v || '').replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

function compCalcularComparativo() {
    const rec = compParseM(document.getElementById('c_receita').value);
    const rbt = compParseM(document.getElementById('c_rbt12').value);
    const fol = compParseM(document.getElementById('c_folha').value);
    const des = compParseM(document.getElementById('c_despesas').value);

    if (rec <= 0) {
        alert('Por favor, insira o faturamento mensal.');
        return;
    }

    // 1. Simples Nacional (Lógica Fator-R simplificada, 1ª faixa)
    const fatorR = rbt > 0 ? ((fol * 12) / rbt) : 0;
    const anexo  = fatorR >= 0.28 ? 'Anexo III' : 'Anexo V';
    const aliqS  = fatorR >= 0.28 ? 0.06 : 0.155;
    const totalS = rec * aliqS;

    document.getElementById('detalhe_s').innerHTML = `
        <div class="item-calc"><span>Fator-R:</span> <b>${(fatorR * 100).toFixed(2)}%</b></div>
        <div class="item-calc"><span>Enquadramento:</span> <b>${anexo}</b></div>
        <div class="item-calc"><span>DAS Mensal:</span> <b>${formatBRL(totalS)}</b></div>
    `;
    document.getElementById('total_s').innerText = formatBRL(totalS);

    // 2. Lucro Presumido (serviço: base 32%)
    const baseP  = rec * 0.32;
    const irpjP  = baseP * 0.15;
    const addP   = baseP > 20000 ? (baseP - 20000) * 0.10 : 0;
    const csllP  = baseP * 0.09;
    const pisP   = rec * 0.0065;
    const cofinsP = rec * 0.03;
    const issP   = rec * 0.05;
    const totalP = irpjP + addP + csllP + pisP + cofinsP + issP;

    document.getElementById('detalhe_p').innerHTML = `
        <div class="item-calc"><span>Base Presumida:</span> <b>${formatBRL(baseP)}</b></div>
        <div class="item-calc"><span>IRPJ (15%) + CSLL:</span> <b>${formatBRL(irpjP + csllP)}</b></div>
        <div class="item-calc"><span>Adicional IRPJ (10%):</span> <b class="destaque-tax">${formatBRL(addP)}</b></div>
        <div class="item-calc"><span>PIS/COFINS (3,65%):</span> <b>${formatBRL(pisP + cofinsP)}</b></div>
    `;
    document.getElementById('total_p').innerText = formatBRL(totalP);

    // 3. Lucro Real (não-cumulativo)
    const lucroR = rec - fol - des;
    const baseR  = lucroR > 0 ? lucroR : 0;
    const irpjR  = baseR * 0.15;
    const addR   = baseR > 20000 ? (baseR - 20000) * 0.10 : 0;
    const csllR  = baseR * 0.09;
    const pisR   = rec * 0.0165;
    const cofinsR = rec * 0.076;
    // Reutiliza issP (ISS 5% sobre rec — igual ao LP pois é sobre o faturamento)
    const totalR = irpjR + addR + csllR + pisR + cofinsR + issP;

    document.getElementById('detalhe_r').innerHTML = `
        <div class="item-calc"><span>Lucro Líquido:</span> <b>${formatBRL(baseR)}</b></div>
        <div class="item-calc"><span>Adicional IRPJ (10%):</span> <b class="destaque-tax">${formatBRL(addR)}</b></div>
        <div class="item-calc"><span>PIS/COFINS (9,25%):</span> <b>${formatBRL(pisR + cofinsR)}</b></div>
        <div class="item-calc"><span>ISS (5%):</span> <b>${formatBRL(issP)}</b></div>
    `;
    document.getElementById('total_r').innerText = formatBRL(totalR);

    // Destaque do menor tributo
    const opcoes = [
        { id: 'card_s', badge: 'badge_s', valor: totalS },
        { id: 'card_p', badge: 'badge_p', valor: totalP },
        { id: 'card_r', badge: 'badge_r', valor: totalR }
    ];

    opcoes.forEach(op => {
        document.getElementById(op.id).classList.remove('melhor-opcao');
        document.getElementById(op.badge).innerHTML = '';
    });

    const melhor = opcoes.reduce((prev, curr) => prev.valor < curr.valor ? prev : curr);
    document.getElementById(melhor.id).classList.add('melhor-opcao');
    document.getElementById(melhor.badge).innerHTML = '<span class="melhor-badge">MELHOR ESCOLHA</span>';

    document.getElementById('grid_resultados').style.display = 'grid';
}

// =========================================
// CALCULADORA 5 — PESSOA FÍSICA (IRRF 2026)
// =========================================

function glefMascaraMoeda(el) {
    let v = el.value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    el.value = v;
}

function glefParseVal(val) {
    if (!val) return 0;
    return parseFloat(val.replace(/\./g, '').replace(',', '.')) || 0;
}

function glefFormatar(val) {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function glefCalcular() {
    const bruto  = glefParseVal(document.getElementById('glef-calc-bruto').value);
    const depNum = parseInt(document.getElementById('glef-calc-dep').value) || 0;
    const dedut  = glefParseVal(document.getElementById('glef-calc-dedut').value);

    if (bruto <= 0) {
        alert('Por favor, informe o salário bruto.');
        return;
    }

    // 1. INSS 2026 (tabela progressiva)
    const tetoInss = 8475.55;
    const baseInss = Math.min(bruto, tetoInss);
    let inss = 0;

    if      (baseInss <= 1621.00) inss = baseInss * 0.075;
    else if (baseInss <= 2902.84) inss = (baseInss * 0.09)  - 24.32;
    else if (baseInss <= 4354.27) inss = (baseInss * 0.12)  - 111.40;
    else                          inss = (baseInss * 0.14)  - 198.49;

    const memoInss =
        `Salário de contribuição: ${glefFormatar(baseInss)}<br>` +
        `<strong>Total INSS: ${glefFormatar(inss)}</strong>`;

    document.getElementById('glef-calc-memo-inss').innerHTML = memoInss;

    // 2. Base de Cálculo IRRF
    const descDep = depNum * 189.59;
    const baseIR  = Math.max(0, bruto - inss - descDep - dedut);
    document.getElementById('glef-calc-base-val').innerText = glefFormatar(baseIR);

    // 3. IRRF — Tabela 2026
    let irInicial = 0;
    let faixaTexto = '';

    if      (baseIR <= 2428.80) { irInicial = 0;                             faixaTexto = 'Faixa: Isento'; }
    else if (baseIR <= 2826.65) { irInicial = (baseIR * 0.075) - 182.16;    faixaTexto = 'Faixa: 7,5%';  }
    else if (baseIR <= 3751.05) { irInicial = (baseIR * 0.15)  - 394.16;    faixaTexto = 'Faixa: 15%';   }
    else if (baseIR <= 4664.68) { irInicial = (baseIR * 0.225) - 675.49;    faixaTexto = 'Faixa: 22,5%'; }
    else                        { irInicial = (baseIR * 0.275) - 908.73;    faixaTexto = 'Faixa: 27,5%'; }

    // 4. Redução adicional 2026
    let reducao = 0;
    if      (bruto <= 5000) reducao = 312.89;
    else if (bruto <= 7350) reducao = 978.62 - (0.133145 * bruto);

    const impostoFinal = Math.max(0, irInicial - reducao);

    let memoIR =
        `Dedução Dependentes (${depNum}): ${glefFormatar(descDep)}<br>` +
        faixaTexto +
        `<br>Imposto Bruto: ${glefFormatar(irInicial)}`;

    if (reducao > 0) {
        memoIR += `<br>Redução Adicional 2026: - ${glefFormatar(reducao)}`;
    }

    document.getElementById('glef-calc-memo-ir').innerHTML = memoIR;
    document.getElementById('glef-calc-final').innerText = glefFormatar(impostoFinal);
    document.getElementById('glef-calc-resultado').style.display = 'block';
}

function glefLimpar() {
    document.getElementById('glef-calc-bruto').value = '';
    document.getElementById('glef-calc-dep').value   = '0';
    document.getElementById('glef-calc-dedut').value = '';
    document.getElementById('glef-calc-resultado').style.display = 'none';
}

// =========================================
// CALCULADORA 6 — MEI (IRPF)
// =========================================

// Aplica máscara BRL nos campos .amz-mask-money ao carregar a aba
// (usamos delegação de eventos para garantir que funcione após o DOM estar pronto)
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('amz-mask-money')) {
        let v = e.target.value.replace(/\D/g, '');
        v = (v / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        e.target.value = (v === '0,00') ? '' : 'R$ ' + v;
    }
});

function amzToggleInput() {
    document.querySelectorAll('.amz-check').forEach(c => {
        const field = document.getElementById('field-' + c.value);
        if (field) {
            c.checked ? field.classList.remove('amz-hidden') : field.classList.add('amz-hidden');
        }
    });
}

function amzParseVal(v) {
    return parseFloat((v || '').replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

function amzFormatar(v) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function amzCalcular() {
    const mult     = parseFloat(document.getElementById('amz-periodo').value);
    const despesas = amzParseVal(document.getElementById('amz-despesas').value) * (mult === 1 ? 12 : 1);

    const atividades = [
        { id: 'comercio',   nome: 'Comércio (8%)',    taxa: 0.08 },
        { id: 'servico',    nome: 'Serviços (32%)',   taxa: 0.32 },
        { id: 'transporte', nome: 'Transporte (16%)', taxa: 0.16 }
    ];

    let totalBrutoAnual = 0;
    let totalIsento     = 0;
    let htmlCorpo       = '';

    atividades.forEach(atv => {
        const inputEl  = document.getElementById('val-' + atv.id);
        const inputVal = inputEl ? amzParseVal(inputEl.value) : 0;

        if (inputVal > 0) {
            const anual      = inputVal * (mult === 1 ? 12 : 1);
            const isencaoAtv = anual * atv.taxa;
            totalBrutoAnual += anual;
            totalIsento     += isencaoAtv;

            htmlCorpo += `<tr><td>Receita Anual ${atv.nome}</td><td>${amzFormatar(anual)}</td></tr>`;
            htmlCorpo += `<tr><td>↳ Parcela Isenta Presumida (${(atv.taxa * 100).toFixed(0)}%)</td><td>${amzFormatar(isencaoAtv)}</td></tr>`;
        }
    });

    if (totalBrutoAnual === 0) {
        alert('Informe ao menos um valor de faturamento.');
        return;
    }

    const lucroReal  = totalBrutoAnual - despesas;
    const tributavel = Math.max(0, lucroReal - totalIsento);

    document.getElementById('amz-table-body').innerHTML = `
        ${htmlCorpo}
        <tr style="background:rgba(255,255,255,0.04)">
            <td><b>(=) TOTAL FATURAMENTO ANUAL</b></td>
            <td><b>${amzFormatar(totalBrutoAnual)}</b></td>
        </tr>
        <tr>
            <td>(-) Despesas Operacionais Comprovadas</td>
            <td>- ${amzFormatar(despesas)}</td>
        </tr>
        <tr>
            <td><b>(=) LUCRO REAL DA EMPRESA</b></td>
            <td><b>${amzFormatar(lucroReal)}</b></td>
        </tr>
    `;

    document.getElementById('res-isento').innerText    = amzFormatar(totalIsento);
    document.getElementById('res-tributavel').innerText = amzFormatar(tributavel);
    document.getElementById('amz-resultado').style.display = 'block';

    // Alertas de limite MEI
    const alerta = document.getElementById('amz-status-alerta');
    if (totalBrutoAnual > 97200) {
        alerta.innerHTML = '🚨 <b>CRÍTICO:</b> Faturamento acima de R$ 97.200,00. Desenquadramento retroativo!';
        alerta.style.background = 'rgba(217,140,163,0.15)';
        alerta.style.borderColor = 'var(--pink)';
        alerta.style.color = 'var(--pink)';
    } else if (totalBrutoAnual > 81000) {
        alerta.innerHTML = '⚠️ <b>ATENÇÃO:</b> Faturamento acima de R$ 81.000,00. Sujeito a desenquadramento no próximo ano.';
        alerta.style.background = 'rgba(255,193,7,0.1)';
        alerta.style.borderColor = '#ffc107';
        alerta.style.color = '#ffc107';
    } else {
        alerta.innerHTML = '✅ <b>Situação Regular:</b> Seu faturamento está dentro do limite anual do MEI.';
        alerta.style.background = 'rgba(127,191,182,0.1)';
        alerta.style.borderColor = 'var(--mint)';
        alerta.style.color = 'var(--mint)';
    }
}

function amzLimpar() {
    document.querySelectorAll('#amz-calc-container input[type="text"]').forEach(i => i.value = '');
    document.querySelectorAll('.amz-check').forEach(c => {
        c.checked = false;
        const field = document.getElementById('field-' + c.value);
        if (field) field.classList.add('amz-hidden');
    });
    document.getElementById('amz-resultado').style.display = 'none';
}

// =========================================
// FERRAMENTAS — GERADOR DE RECIBOS + LICITAÇÃO/MARKUP
// (escopo isolado: não interfere nas calculadoras acima)
// =========================================
(function () {
    'use strict';

    const $ = (id) => document.getElementById(id);
    const brl = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const num2 = (v) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const parseMoney = (s) => parseFloat(String(s || '').replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.')) || 0;

    // ---------- Abas ----------
    document.querySelectorAll('.fer-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.fer-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            document.querySelectorAll('.fer-panel').forEach((p) => p.classList.remove('active'));
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = $('fer-tab-' + tab.dataset.fer);
            if (panel) panel.classList.add('active');
        });
    });

    // ---------- Impressão (isola a ferramenta ativa) ----------
    function ferPrint(kind) {
        const cls = 'fer-print-' + kind;
        const done = () => { document.body.classList.remove(cls); window.removeEventListener('afterprint', done); };
        document.body.classList.add(cls);
        window.addEventListener('afterprint', done);
        window.print();
    }

    // =====================================================
    // RECIBO
    // =====================================================
    let tipo = 'PF';
    let pgdDoc = 'CPF';
    let pstDoc = 'CPF';

    const fmtCPF = (v) => v.replace(/\D/g, '').substring(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    const fmtCNPJ = (v) => v.replace(/\D/g, '').substring(0, 14)
        .replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');

    function applyDoc(id, tp) {
        const el = $(id);
        el.value = '';
        el.placeholder = tp === 'CNPJ' ? '00.000.000/0000-00' : '000.000.000-00';
        el.maxLength = tp === 'CNPJ' ? 18 : 14;
    }
    function setActive(a, b, first) { $(a).classList.toggle('active', first); $(b).classList.toggle('active', !first); }

    function setPgdDoc(tp) { pgdDoc = tp; setActive('fer-pgd-cpf', 'fer-pgd-cnpj', tp === 'CPF'); applyDoc('fer-pgd-doc', tp); }
    function setPstDoc(tp) { pstDoc = tp; setActive('fer-pst-cpf', 'fer-pst-cnpj', tp === 'CPF'); applyDoc('fer-pst-doc', tp); }

    function setTipo(t) {
        tipo = t;
        $('fer-tipo-pf').classList.toggle('active', t === 'PF');
        $('fer-tipo-pj').classList.toggle('active', t === 'PJ');
        $('fer-pf-box').style.display = t === 'PF' ? '' : 'none';
        $('fer-pj-box').style.display = t === 'PJ' ? '' : 'none';
        $('fer-tax-title').textContent = t === 'PF' ? 'Descontos e impostos (PF)' : 'Impostos sobre o serviço (PJ)';
        if (t === 'PJ') { $('fer-pst-doc-btns').style.display = 'flex'; setPstDoc('CNPJ'); }
        else { $('fer-pst-doc-btns').style.display = 'none'; pstDoc = 'CPF'; applyDoc('fer-pst-doc', 'CPF'); }
        $('fer-pgd-doc').value = '';
        recalc();
    }

    // Tabelas INSS e IRRF 2026 — as mesmas da calculadora "Pessoa Física" acima
    function calcINSS(b) {
        const base = Math.min(b, 8475.55);
        if (base <= 1621.00) return base * 0.075;
        if (base <= 2902.84) return base * 0.09 - 24.32;
        if (base <= 4354.27) return base * 0.12 - 111.40;
        return base * 0.14 - 198.49;
    }
    function calcIR(baseIR, bruto) {
        let ir;
        if (baseIR <= 2428.80) ir = 0;
        else if (baseIR <= 2826.65) ir = baseIR * 0.075 - 182.16;
        else if (baseIR <= 3751.05) ir = baseIR * 0.15 - 394.16;
        else if (baseIR <= 4664.68) ir = baseIR * 0.225 - 675.49;
        else ir = baseIR * 0.275 - 908.73;
        ir = Math.max(ir, 0);
        let red = 0;
        if (bruto <= 5000) red = 312.89;
        else if (bruto <= 7350) red = 978.62 - 0.133145 * bruto;
        red = Math.min(Math.max(red, 0), ir);
        return { ir: ir - red, reducao: red };
    }

    const pct = (id) => (parseFloat(($(id).value || '0').replace(',', '.')) || 0) / 100;
    const pctTxt = (id) => num2(pct(id) * 100);
    const getValor = () => parseMoney($('fer-valor').value);

    // Monta o modelo de descontos usado no resumo e no recibo
    function taxModel(bruto) {
        if (bruto <= 0) return null;

        if (tipo === 'PF') {
            if (!$('fer-chk-pf').checked) return null;
            const inss = calcINSS(bruto);
            const baseIR = bruto - inss;
            const r = calcIR(baseIR, bruto);
            const tot = inss + r.ir;
            const rows = [
                { l: 'INSS (progressivo 2026)', v: -inss },
                { l: 'Base de cálculo do IR', v: baseIR, info: true },
            ];
            if (r.reducao > 0) rows.push({ l: 'Redução adicional 2026', v: r.reducao, info: true });
            rows.push({ l: 'IR retido', v: -r.ir });
            return { titulo: 'Descontos — tabelas 2026', rows, total: tot, liquido: bruto - tot, totalLabel: 'Total de descontos' };
        }

        if (!$('fer-chk-pj').checked) return null;
        const reg = $('fer-regime').value;
        if (reg === 'mei') {
            return { titulo: 'Regime: MEI — sem retenções na fonte', rows: [], total: 0, liquido: bruto, nota: 'MEI é isento de retenções. Tributos recolhidos via DAS mensal fixo.', totalLabel: 'Retenções' };
        }
        if (reg === 'simples') {
            const iss = bruto * pct('fer-a-iss-s');
            return { titulo: 'Regime: Simples Nacional — retenção de ISS', rows: [{ l: `ISS (${pctTxt('fer-a-iss-s')}%)`, v: -iss }], total: iss, liquido: bruto - iss, nota: 'Demais tributos do Simples recolhidos via DAS pelo prestador.', totalLabel: 'Total de retenções' };
        }
        const lista = [['ISS', 'fer-a-iss'], ['IRPJ', 'fer-a-irpj'], ['CSLL', 'fer-a-csll'], ['PIS', 'fer-a-pis'], ['COFINS', 'fer-a-cofins'], ['CBS', 'fer-a-cbs'], ['IBS', 'fer-a-ibs']];
        let tot = 0;
        const rows = lista.map(([n, id]) => { const v = bruto * pct(id); tot += v; return { l: `${n} (${pctTxt(id)}%)`, v: -v }; });
        return { titulo: 'Regime: PJ em geral — retenções na fonte', rows, total: tot, liquido: bruto - tot, totalLabel: 'Total de retenções' };
    }

    const money = (r) => (r.info ? brl(r.v) : '- ' + brl(Math.abs(r.v)));

    function recalc() {
        const bruto = getValor();
        const box = $('fer-summary');
        const m = taxModel(bruto);
        if (!m) { box.classList.remove('show'); return; }
        let html = `<div class="fer-line"><span>Valor bruto</span><span>${brl(bruto)}</span></div>`;
        m.rows.forEach((r) => { html += `<div class="fer-line"><span>${esc(r.l)}</span><span>${money(r)}</span></div>`; });
        if (m.nota) html += `<div class="fer-line"><span>${esc(m.nota)}</span><span></span></div>`;
        html += `<div class="fer-line"><span>${esc(m.totalLabel)}</span><span>- ${brl(m.total)}</span></div>`;
        html += `<div class="fer-line"><span>Valor líquido a receber</span><span>${brl(m.liquido)}</span></div>`;
        $('fer-summary-lines').innerHTML = html;
        box.classList.add('show');
    }

    function onRegime() {
        const reg = $('fer-regime').value;
        const info = $('fer-regime-info');
        $('fer-aliq-simples').style.display = 'none';
        $('fer-aliq-geral').style.display = 'none';
        info.style.display = 'block';
        if (reg === 'mei') {
            info.innerHTML = '<strong>MEI:</strong> isento de IRPJ, PIS, COFINS e CSLL. Paga apenas o DAS mensal fixo e não sofre retenção na fonte sobre o recibo.';
        } else if (reg === 'simples') {
            info.innerHTML = '<strong>Simples Nacional:</strong> apenas o ISS pode ser retido na fonte pelo tomador. Os demais tributos vão no DAS.';
            $('fer-aliq-simples').style.display = '';
        } else {
            info.innerHTML = '<strong>PJ em geral:</strong> sujeita a retenções de ISS, IRPJ, CSLL, PIS, COFINS, CBS e IBS. Ajuste as alíquotas se necessário.';
            $('fer-aliq-geral').style.display = '';
        }
        recalc();
    }

    // Valor por extenso (até 999.999.999,99)
    function extenso(v) {
        const un = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const dz = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const cn = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
        const grupo = (n) => {
            if (n === 100) return 'cem';
            const c = Math.floor(n / 100), r = n % 100, p = [];
            if (c) p.push(cn[c]);
            if (r) {
                if (r < 20) p.push(un[r]);
                else p.push(r % 10 ? dz[Math.floor(r / 10)] + ' e ' + un[r % 10] : dz[Math.floor(r / 10)]);
            }
            return p.join(' e ');
        };
        const cents = Math.round(v * 100);
        const int = Math.floor(cents / 100), cts = cents % 100;
        if (cents === 0) return 'Zero reais';

        const mi = Math.floor(int / 1e6), mil = Math.floor((int % 1e6) / 1000), res = int % 1000;
        const partes = [];
        if (mi) partes.push(mi === 1 ? 'um milhão' : grupo(mi) + ' milhões');
        if (mil) partes.push(mil === 1 ? 'mil' : grupo(mil) + ' mil');
        if (res) partes.push(grupo(res));
        let txt = '';
        partes.forEach((p, i) => {
            if (i === 0) { txt = p; return; }
            const ultimo = i === partes.length - 1;
            const val = res || mil;
            txt += (ultimo && (val < 100 || val % 100 === 0) ? ' e ' : ', ') + p;
        });
        if (int > 0) txt += (int % 1e6 === 0 ? ' de reais' : int === 1 ? ' real' : ' reais');
        if (cts) txt += (int > 0 ? ' e ' : '') + grupo(cts) + (cts === 1 ? ' centavo' : ' centavos');
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    function gerarRecibo() {
        const bruto = getValor();
        if (bruto <= 0) { alert('Informe um valor válido para o recibo.'); $('fer-valor').focus(); return; }

        const blank = '___________________________';
        const recebido = esc($('fer-pgd-nome').value.trim() || blank);
        const prestador = esc($('fer-pst-nome').value.trim() || blank);
        const referente = esc($('fer-referente').value.trim() || blank);
        const dPgd = esc($('fer-pgd-doc').value.trim());
        const dPst = esc($('fer-pst-doc').value.trim());
        const dv = $('fer-data').value;
        const dfmt = (dv ? new Date(dv + 'T12:00:00') : new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        const pgdLbl = pgdDoc === 'CNPJ' ? 'CNPJ pagador' : 'CPF pagador';
        const pstLbl = tipo === 'PJ' && pstDoc === 'CNPJ' ? 'CNPJ prestador' : 'CPF prestador';

        const m = taxModel(bruto);
        let taxHTML = '';
        if (m) {
            const grid = m.rows.length
                ? `<div class="fer-rc-grid">${m.rows.map((r) => `<div><small>${esc(r.l)}</small><strong>${money(r)}</strong></div>`).join('')}<div><small>${esc(m.totalLabel)}</small><strong>- ${brl(m.total)}</strong></div></div>`
                : '';
            taxHTML = `<div class="fer-rc-tax">
                <div class="fer-rc-tax-title">${esc(m.titulo)}</div>${grid}
                <div class="fer-rc-liq"><span>Valor líquido a receber</span><span>${brl(m.liquido)}</span></div>
                ${m.nota ? `<p>${esc(m.nota)}</p>` : ''}
            </div>`;
        }
        const regNome = tipo === 'PJ' && $('fer-chk-pj').checked ? ' | ' + { mei: 'MEI', simples: 'Simples Nacional', geral: 'PJ em geral' }[$('fer-regime').value] : '';

        const html = `
            <div class="fer-rc-header">
                <div><div class="fer-rc-title">RECIBO</div><div class="fer-rc-sub">Emitido em ${dfmt}${regNome}</div></div>
                <div class="fer-rc-badge">${tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</div>
            </div>
            <div class="fer-rc-value"><small>Valor do recibo</small><strong>${brl(bruto)}</strong><em>${extenso(bruto)}</em></div>
            <div class="fer-rc-fields">
                <div class="fer-rc-field"><b>Recebido de</b><span>${recebido}</span></div>
                ${dPgd ? `<div class="fer-rc-field"><b>${pgdLbl}</b><span>${dPgd}</span></div>` : ''}
                <div class="fer-rc-field"><b>Prestador</b><span>${prestador}</span></div>
                ${dPst ? `<div class="fer-rc-field"><b>${pstLbl}</b><span>${dPst}</span></div>` : ''}
                <div class="fer-rc-field"><b>Referente a</b><span>${referente}</span></div>
            </div>
            ${taxHTML}
            <div class="fer-rc-footer">
                <div class="fer-rc-date">Data de emissão<strong>${dfmt}</strong></div>
                <div class="fer-rc-sign"><i></i><b>${prestador}</b><small>Assinatura do prestador</small></div>
            </div>
            <div class="fer-rc-obs">Este recibo quita a obrigação descrita acima. Valor bruto: ${brl(bruto)}${m ? ' | Valor líquido: ' + brl(m.liquido) : ''}.</div>
            <div class="fer-rc-credit">Gerado em Glef · Gestões Inteligentes</div>`;

        $('fer-recibo-1').innerHTML = html;
        $('fer-recibo-2').innerHTML = html;
        $('fer-recibo-out').style.display = 'block';
        $('fer-recibo-out').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function limparRecibo() {
        ['fer-pgd-nome', 'fer-pgd-doc', 'fer-pst-nome', 'fer-pst-doc', 'fer-referente', 'fer-valor'].forEach((id) => { $(id).value = ''; });
        $('fer-data').value = new Date().toISOString().split('T')[0];
        $('fer-chk-pf').checked = false;
        $('fer-chk-pj').checked = false;
        $('fer-pj-panel').style.display = 'none';
        $('fer-recibo-out').style.display = 'none';
        recalc();
    }

    // Eventos do recibo
    $('fer-tipo-pf').addEventListener('click', () => setTipo('PF'));
    $('fer-tipo-pj').addEventListener('click', () => setTipo('PJ'));
    $('fer-pgd-cpf').addEventListener('click', () => setPgdDoc('CPF'));
    $('fer-pgd-cnpj').addEventListener('click', () => setPgdDoc('CNPJ'));
    $('fer-pst-cpf').addEventListener('click', () => setPstDoc('CPF'));
    $('fer-pst-cnpj').addEventListener('click', () => setPstDoc('CNPJ'));
    $('fer-pgd-doc').addEventListener('input', (e) => { e.target.value = pgdDoc === 'CNPJ' ? fmtCNPJ(e.target.value) : fmtCPF(e.target.value); });
    $('fer-pst-doc').addEventListener('input', (e) => { e.target.value = pstDoc === 'CNPJ' ? fmtCNPJ(e.target.value) : fmtCPF(e.target.value); });
    $('fer-valor').addEventListener('input', (e) => {
        const d = e.target.value.replace(/\D/g, '');
        e.target.value = d ? num2(Number(d) / 100) : '';
        recalc();
    });
    document.querySelectorAll('.fer-aliq-grid input').forEach((el) => {
        el.addEventListener('input', () => { el.value = el.value.replace(/[^0-9,.]/g, ''); recalc(); });
    });
    $('fer-chk-pf').addEventListener('change', recalc);
    $('fer-chk-pj').addEventListener('change', () => {
        const on = $('fer-chk-pj').checked;
        $('fer-pj-panel').style.display = on ? '' : 'none';
        if (on) onRegime(); else recalc();
    });
    $('fer-regime').addEventListener('change', onRegime);
    $('fer-gerar').addEventListener('click', gerarRecibo);
    $('fer-limpar').addEventListener('click', limparRecibo);
    $('fer-imprimir-recibo').addEventListener('click', () => ferPrint('recibo'));

    $('fer-data').value = new Date().toISOString().split('T')[0];
    applyDoc('fer-pgd-doc', 'CPF');
    applyDoc('fer-pst-doc', 'CPF');

    // =====================================================
    // LICITAÇÃO / MARKUP
    // =====================================================
    const pctIds = ['21', '22', '23', '31', '32', '33', '34', '4', '5'];
    const pctInputs = pctIds.map((i) => $('lic-p' + i));
    const getP = (i) => (parseFloat($('lic-p' + i).value.replace('%', '').replace(/\./g, '').replace(',', '.')) || 0) / 100;
    const pTxt = (v) => num2(v * 100) + '%';
    const setKpi = (id, main, sub) => { $('lic-k-' + id).textContent = main; $('lic-k-' + id + '-sub').textContent = sub; };

    function licCalcular() {
        const contrato = parseMoney($('lic-valor').value);
        const alerta = $('lic-alert');
        alerta.style.display = 'none';

        if (contrato <= 0) {
            pctIds.forEach((i) => { $('lic-v' + i).value = ''; });
            ['2t', '3t', '6'].forEach((i) => { $('lic-v' + i).value = ''; });
            ['2t', '3t'].forEach((i) => { $('lic-p' + i).value = ''; });
            setKpi('markup', '—', 'Contrato ÷ custos diretos');
            setKpi('bruta', '—', 'Contrato − custos diretos');
            setKpi('liquida', '—', 'Após despesas e impostos');
            return;
        }

        const val = {};
        pctIds.forEach((i) => { val[i] = contrato * getP(i); $('lic-v' + i).value = brl(val[i]); });

        const cd = val['21'] + val['22'] + val['23'];
        const di = val['31'] + val['32'] + val['33'] + val['34'];
        $('lic-p2t').value = pTxt(cd / contrato);
        $('lic-v2t').value = brl(cd);
        $('lic-p3t').value = pTxt(di / contrato);
        $('lic-v3t').value = brl(di);

        const liquido = contrato - cd - di - val['5'];
        $('lic-v6').value = brl(liquido);

        // Markup = contrato ÷ custos diretos; percentual = (markup − 1) × 100
        if (cd > 0) {
            const mk = contrato / cd;
            setKpi('markup', mk.toFixed(4).replace('.', ','), `Acréscimo de ${num2((mk - 1) * 100)}% sobre os custos diretos`);
        } else {
            setKpi('markup', '—', 'Informe os custos diretos');
        }
        const bruta = contrato - cd;
        setKpi('bruta', pTxt(bruta / contrato), brl(bruta));
        setKpi('liquida', pTxt(liquido / contrato), brl(liquido));

        if (liquido < 0) {
            alerta.textContent = 'Atenção: o resultado líquido estimado é negativo. Revise custos, despesas e impostos antes de enviar a proposta.';
            alerta.style.display = 'block';
        }
    }

    function licLimpar() {
        $('lic-valor').value = '';
        pctInputs.forEach((el) => { el.value = ''; });
        licCalcular();
    }

    $('lic-valor').addEventListener('input', (e) => {
        const d = e.target.value.replace(/\D/g, '');
        e.target.value = d ? brl(Number(d) / 100) : '';
        licCalcular();
    });
    pctInputs.forEach((el) => {
        el.addEventListener('input', () => {
            const d = el.value.replace(/\D/g, '');
            el.value = d ? num2(Number(d) / 100) + '%' : '';
            licCalcular();
        });
    });
    $('lic-limpar').addEventListener('click', licLimpar);
    $('lic-imprimir').addEventListener('click', () => ferPrint('licitacao'));
})();
