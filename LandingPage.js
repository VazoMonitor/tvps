import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ServerIcon,
  LockClosedIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const [resultsOpen, setResultsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [vazamentos, setVazamentos] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const LoadingIndicator = () => (
    <div className="flex space-x-2 justify-center items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-emerald-600 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const handleSearchClick = async () => {
    setResultsOpen(true);
    setLoading(true);
    
    try {
      const response = await fetch(`https://api.vazo.info/api/consulta-inicial/${domain}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setAlertMessage(data.texto);
      setAlertColor(data.empresaSegura ? 'text-emeralda-600' : 'text-red-600');
      setVazamentos(data.vazamentos);
      
    } catch (error) {
      console.error('Erro na consulta:', error);
      setAlertMessage('Erro ao conectar com o serviço. Tente novamente.');
      setAlertColor('text-red-600');
      setVazamentos(null);
    } finally {
      setLoading(false);
    }
  };

  const TestimonialCard = ({ text, author, role }) => (
    <div className="bg-gray-100 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all">
      <p className="text-gray-700 mb-6 italic">"{text}"</p>
      <div className="border-t border-gray-300 pt-4">
        <h4 className="font-semibold text-gray-900">{author}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
  
  const CompanyLogo = ({ src }) => (
    <img 
      src={src} 
      alt="Logo Empresa" 
      className="h-12 mx-auto transition-transform duration-300 hover:scale-105"
    />
  );
  

  return (
    <div className="font-sans bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <img
              src="./vazo-png-logo.png"
              alt="Vazô Logo"
              className="h-6 lg:h-6 w-auto"
            />
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {['Tecnologia', 'Resultados', 'Planos'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#059669' }}
                className="text-gray-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-emerald-200 flex items-center gap-2"
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Começar Agora
            </motion.a>
          </nav>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute w-full bg-white shadow-xl border-b"
            >
              <div className="p-4 space-y-2">
                {['Tecnologia', 'Resultados', 'Planos'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#pricing"
                  className="block mt-2 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium text-center"
                >
                  Começar Agora
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Proteção Inteligente Contra
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent block mt-4">
                  Vazamentos de Dados
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Monitoramento 24/7 com tecnologia de ponta para proteger sua empresa 
              </p>
            </motion.div>

            <motion.div
  className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-400"
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
>
  <div className="flex flex-col md:flex-row gap-2 p-1.5 md:p-2">
    <div className="flex-1 relative">
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
        placeholder="exemplo.com.br"
        className="w-full pl-12 pr-4 py-4 text-lg md:text-xl border-0 rounded-xl placeholder-gray-400 focus:outline-none"
      />
      <GlobeAltIcon className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2" />
    </div>
    <motion.button
      onClick={handleSearchClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 md:px-8 md:py-5 rounded-xl font-semibold text-lg md:text-xl shadow-lg hover:shadow-emerald-400 disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {loading ? 'Verificando...' : 'Verificar Domínio'}
    </motion.button>
  </div>
</motion.div>

<AnimatePresence>
  {resultsOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-8 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-emerald-100"
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <p className={`text-xl font-semibold text-center mb-4 ${alertColor}`}>
            {alertMessage}
          </p>
          {vazamentos !== null && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <span className="font-medium">Vazamentos Detectados</span>
                <span className="text-2xl font-bold">{vazamentos}</span>
              </div>
              <a
                href="https://wa.me/5516993505124"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-center"
              >
                Remover Dados Expostos
              </a>
            </div>
          )}
        </>
      )}
    </motion.div>
  )}
</AnimatePresence>
          
          {/* SEÇÃO DE EMPRESAS PROTEGIDAS
            <div className="mt-12 flex justify-center items-center gap-4 text-gray-500">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/732/732228.png" 
                alt="Empresas parceiras" 
                className="h-8 opacity-50 grayscale" 
              />
              <span className="text-sm">+200 empresas protegidas</span>
            </div>
      */}

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Tecnologia que Protege seu Negócio
            </motion.h2>
            <p className="text-gray-600 text-lg mb-12">
              Combinação perfeita de inteligência artificial e expertise humana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6 flex items-center justify-center">
                <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitoramento Contínuo</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Varredura automatizada em mais de 500 fontes de dados incluindo dark web
              </p>
              <img 
                src="https://vazo.info/1.png" 
                alt="Monitoramento" 
                className="mt-4 rounded-xl shadow-lg" 
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6 flex items-center justify-center">
                <LockClosedIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proteção Ativa</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Remoção automática de dados expostos em até 15 minutos após detecção
              </p>
              <img 
                src="https://vazo.info/2.png" 
                alt="Proteção" 
                className="mt-4 rounded-xl shadow-lg" 
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6 flex items-center justify-center">
                <ChartBarIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Relatórios Detalhados</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Dashboard interativo com análises de risco e histórico de ameaças
              </p>
              <img 
                src="https://vazo.info/3.png" 
                alt="Relatórios" 
                className="mt-4 rounded-xl shadow-lg" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Resultados que Transformam
            </h2>
            <p className="text-gray-600 text-lg">
              Dados reais de empresas que confiaram na nossa solução
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
              <div className="text-5xl font-bold text-emerald-600 mb-4">98%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redução de Incidentes</h3>
              <p className="text-gray-600">Média entre nossos clientes</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
              <div className="text-5xl font-bold text-emerald-600 mb-4">24h</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Monitoramento Contínuo</h3>
              <p className="text-gray-600">Atualizações em tempo real</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100">
              <div className="text-5xl font-bold text-emerald-600 mb-4">5min</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tempo Médio de Resposta</h3>
              <p className="text-gray-600">Para novas ameaças</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Planos que se Adaptam a Você</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700"
            >
                            <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-sm">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Plano Premium</h3>
              <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                   Tudo do básico
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Monitoramento de até 15 domínios
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Equipe dedicada
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Treinamentos personalizados
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Notificações Automáticas - E-Mail/Whatsapp
                </li>
              </ul>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                Contratar Plano
              </button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700 relative"
            >

              <h3 className="text-2xl font-bold mb-4">Plano Básico</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Monitoramento de até 3 domínios
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Remoção automática de dados
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Suporte prioritário 24/7
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Relatórios detalhados
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Notificações Automáticas - E-Mail
                </li>
              </ul>
              <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                Contratar Plano
              </button>
            </motion.div>

          </div>
        </div>
      </section>

{/*
      <section className="py-10 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Quem Confia na Nossa Solução</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Empresas líderes que protegem seus dados conosco</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16">
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard 
              text="A Vazô revolucionou nossa segurança digital. Monitoramento preciso e suporte excepcional!"
              author="Carlos Silva"
              role="CEO, TechCorp"
            />
            <TestimonialCard 
              text="A redução de incidentes foi imediata após a implementação. Recomendo para todas as empresas!"
              author="Ana Souza"
              role="Diretora de TI, InovaTech"
            />
            <TestimonialCard 
              text="Relatórios detalhados e interface intuitiva. A melhor solução de segurança que já utilizamos."
              author="Ricardo Fernandes"
              role="Gerente de Segurança, DataSafe"
            />
          </div>
        </div>
      </section> 
*/}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Comece a Proteger sua Empresa Hoje
            </h2>
            <p className="text-white/90 text-xl mb-8">
              Tenha uma demonstração gratuita. Sem compromisso.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 shadow-lg flex items-center gap-2"
              >
                <ShieldCheckIcon className="w-5 h-5" />
                Iniciar Monitoramento
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 flex items-center gap-2"
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
                Agendar Demonstração
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="./vazo-png-logo-invertido.png"
                alt="Logo"
                className="h-8 mb-4"
              />
              <p className="text-sm">Proteção inteligente contra vazamentos de dados</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            © {new Date().getFullYear()} Vazô. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>

    
  );
};

export default LandingPage;