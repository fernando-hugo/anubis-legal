"use client"

import { Shield, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacidadePage() {
  const router = useRouter()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h2 { font-size: 16px; font-weight: 700; color: #111827; margin: 32px 0 12px; }
        p { font-size: 14px; color: #4b5563; line-height: 1.8; margin: 0 0 12px; }
        ul { padding-left: 20px; margin: 0 0 12px; }
        li { font-size: 14px; color: #4b5563; line-height: 1.8; margin-bottom: 4px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(180deg, #050508, #0a0a10)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "20px 32px",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <button onClick={() => router.back()} style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", padding: "8px 14px", cursor: "pointer",
            color: "rgba(255,255,255,0.6)", fontSize: "13px",
          }}>
            <ArrowLeft size={14} /> Voltar
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Shield size={20} color="#C9A84C" />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "white", letterSpacing: "0.5px" }}>
              Política de Privacidade
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 32px 80px" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid #e5e7eb" }}>

            <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid #f3f4f6" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
                Política de Privacidade
              </h1>
              <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
              <div style={{ marginTop: "12px", padding: "12px 16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px" }}>
                <p style={{ fontSize: "13px", color: "#15803d", margin: 0, fontWeight: 500 }}>
                  ✅ Em conformidade com a Lei Geral de Proteção de Dados (LGPD) — Lei nº 13.709/2018
                </p>
              </div>
            </div>

            <h2>1. Quem somos</h2>
            <p>
              A <strong>Anubis Tech</strong> (CNPJ: 42.804.763/0001-35) é responsável pelo desenvolvimento e operação do sistema <strong>Anubis Legal OS</strong>, plataforma de gestão jurídica voltada para escritórios de advocacia. Atuamos como operadores e, em alguns casos, controladores dos dados pessoais tratados em nossa plataforma.
            </p>

            <h2>2. Quais dados coletamos</h2>
            <p>Coletamos e tratamos os seguintes tipos de dados:</p>
            <ul>
              <li><strong>Dados de identificação:</strong> nome, e-mail, CPF/CNPJ, telefone</li>
              <li><strong>Dados de acesso:</strong> endereço IP, navegador, dispositivo, logs de autenticação</li>
              <li><strong>Dados processuais:</strong> informações sobre processos jurídicos cadastrados pelos usuários</li>
              <li><strong>Dados financeiros:</strong> registros de horas, valores de honorários e faturas</li>
              <li><strong>Dados de uso:</strong> interações com a plataforma para melhoria do serviço</li>
            </ul>

            <h2>3. Como utilizamos seus dados</h2>
            <p>Seus dados são utilizados para:</p>
            <ul>
              <li>Prestação dos serviços contratados e operação da plataforma</li>
              <li>Autenticação e controle de acesso ao sistema</li>
              <li>Comunicações sobre o serviço, atualizações e suporte técnico</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
              <li>Melhoria contínua da plataforma e experiência do usuário</li>
              <li>Prevenção a fraudes e segurança da informação</li>
            </ul>

            <h2>4. Base legal para tratamento</h2>
            <p>Tratamos seus dados com base nas seguintes hipóteses legais previstas na LGPD:</p>
            <ul>
              <li><strong>Execução de contrato:</strong> para prestação dos serviços contratados</li>
              <li><strong>Legítimo interesse:</strong> para melhoria do serviço e segurança</li>
              <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
              <li><strong>Consentimento:</strong> para comunicações de marketing, quando aplicável</li>
            </ul>

            <h2>5. Compartilhamento de dados</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Podemos compartilhar dados com:
            </p>
            <ul>
              <li><strong>Provedores de infraestrutura:</strong> serviços de hospedagem e banco de dados (Neon, Vercel) com acordos de confidencialidade</li>
              <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
              <li><strong>Parceiros de pagamento:</strong> para processamento de cobranças, quando aplicável</li>
            </ul>

            <h2>6. Segurança dos dados</h2>
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados:</p>
            <ul>
              <li>Criptografia SSL/TLS em todas as transmissões de dados</li>
              <li>Armazenamento seguro em banco de dados com criptografia em repouso</li>
              <li>Autenticação segura com hash de senhas (bcrypt)</li>
              <li>Controle de acesso baseado em perfis (admin, advogado, assistente)</li>
              <li>Logs de acesso e monitoramento de atividades suspeitas</li>
              <li>Arquitetura multi-tenant com isolamento por organização</li>
            </ul>

            <h2>7. Retenção de dados</h2>
            <p>
              Mantemos seus dados pelo período necessário à prestação dos serviços e cumprimento de obrigações legais. Após o encerramento do contrato, os dados são mantidos por até <strong>5 anos</strong> para fins de auditoria e cumprimento legal, salvo solicitação de exclusão pelo titular.
            </p>

            <h2>8. Seus direitos como titular</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar portabilidade dos dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Opor-se ao tratamento em caso de descumprimento da lei</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail: <strong>fernandohugoferreira@gmail.com</strong>
            </p>

            <h2>9. Cookies</h2>
            <p>
              Utilizamos cookies essenciais para funcionamento da autenticação e sessão do usuário. Não utilizamos cookies de rastreamento para fins publicitários.
            </p>

            <h2>10. Encarregado de Dados (DPO)</h2>
            <p>
              O encarregado pelo tratamento de dados pessoais da Anubis Tech é <strong>Fernando Hugo Ferreira</strong>, acessível pelo e-mail <strong>fernandohugoferreira@gmail.com</strong> ou telefone <strong>(11) 96210-4871</strong>.
            </p>

            <h2>11. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. Notificaremos os usuários sobre mudanças significativas por e-mail ou aviso na plataforma. O uso continuado do serviço após as alterações constitui aceitação da política revisada.
            </p>

            <h2>12. Contato</h2>
            <p>
              Para dúvidas, solicitações ou reclamações relacionadas à privacidade de dados:
            </p>
            <ul>
              <li><strong>E-mail:</strong> fernandohugoferreira@gmail.com</li>
              <li><strong>Telefone:</strong> (11) 96210-4871</li>
              <li><strong>Instagram:</strong> @anubis.tec</li>
            </ul>
            <p>
              Você também pode entrar em contato com a <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong> em caso de reclamações: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>www.gov.br/anpd</a>
            </p>

          </div>
        </div>
      </div>
    </>
  )
}