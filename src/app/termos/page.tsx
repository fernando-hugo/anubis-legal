"use client"

import { FileText, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermosPage() {
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
            <FileText size={20} color="#C9A84C" />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "white", letterSpacing: "0.5px" }}>
              Termos de Uso
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 32px 80px" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid #e5e7eb" }}>

            <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid #f3f4f6" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>
                Termos de Uso
              </h1>
              <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o <strong>Anubis Legal OS</strong>, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o serviço. O uso continuado da plataforma implica aceitação integral destes termos e de quaisquer atualizações futuras.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O <strong>Anubis Legal OS</strong> é um sistema de gestão jurídica SaaS (Software as a Service) desenvolvido pela <strong>Anubis Tech</strong> (CNPJ: 42.804.763/0001-35), destinado exclusivamente a escritórios de advocacia e profissionais do direito. A plataforma oferece funcionalidades de gestão de processos, prazos, clientes, documentos e financeiro.
            </p>

            <h2>3. Cadastro e Acesso</h2>
            <p>Para utilizar o serviço, o contratante deve:</p>
            <ul>
              <li>Fornecer informações verdadeiras, completas e atualizadas no cadastro</li>
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Notificar imediatamente a Anubis Tech sobre uso não autorizado de sua conta</li>
              <li>Ser responsável por todas as atividades realizadas em sua conta</li>
            </ul>
            <p>
              A Anubis Tech reserva-se o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio.
            </p>

            <h2>4. Planos e Pagamentos</h2>
            <p>
              O serviço é oferecido mediante contrato com pagamento de taxa de implantação e mensalidade, conforme proposta comercial aceita pelo contratante. O não pagamento nas datas acordadas poderá resultar na suspensão do acesso à plataforma.
            </p>
            <ul>
              <li>Os valores podem ser reajustados anualmente com aviso prévio de 30 dias</li>
              <li>Não há reembolso de mensalidades pagas por período já decorrido</li>
              <li>O cancelamento deve ser solicitado com 30 dias de antecedência</li>
            </ul>

            <h2>5. Uso Permitido</h2>
            <p>O usuário se compromete a utilizar a plataforma exclusivamente para fins lícitos e em conformidade com a legislação brasileira. É permitido:</p>
            <ul>
              <li>Cadastrar e gerenciar processos jurídicos do escritório</li>
              <li>Registrar clientes, prazos, documentos e lançamentos financeiros</li>
              <li>Gerar relatórios e faturas relacionados à atividade advocatícia</li>
              <li>Adicionar usuários do próprio escritório com perfis adequados</li>
            </ul>

            <h2>6. Uso Proibido</h2>
            <p>É expressamente proibido:</p>
            <ul>
              <li>Compartilhar credenciais de acesso com terceiros não autorizados</li>
              <li>Tentar acessar dados de outros escritórios ou usuários</li>
              <li>Realizar engenharia reversa, descompilar ou modificar o software</li>
              <li>Usar a plataforma para atividades ilegais ou antiéticas</li>
              <li>Cadastrar dados falsos ou fraudulentos</li>
              <li>Sobrecarregar intencionalmente a infraestrutura do sistema</li>
              <li>Revender ou sublicenciar o acesso ao sistema sem autorização</li>
            </ul>

            <h2>7. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo da plataforma — incluindo código-fonte, design, marca, logotipo, funcionalidades e documentação — é de propriedade exclusiva da <strong>Anubis Tech</strong> e protegido pela legislação de propriedade intelectual brasileira. O contratante recebe apenas uma licença de uso não exclusiva, intransferível e revogável.
            </p>

            <h2>8. Dados e Confidencialidade</h2>
            <p>
              Os dados inseridos pelo contratante na plataforma são de sua propriedade. A Anubis Tech trata esses dados como confidenciais e não os utiliza para fins além dos descritos na Política de Privacidade. Em caso de encerramento do contrato, os dados podem ser exportados mediante solicitação dentro do prazo de 30 dias.
            </p>

            <h2>9. Disponibilidade do Serviço</h2>
            <p>
              A Anubis Tech se esforça para manter a plataforma disponível 24 horas por dia, 7 dias por semana. No entanto, não garantimos disponibilidade ininterrupta e não nos responsabilizamos por:
            </p>
            <ul>
              <li>Indisponibilidades decorrentes de manutenção programada (com aviso prévio)</li>
              <li>Falhas de infraestrutura de terceiros (provedores de cloud)</li>
              <li>Eventos de força maior ou caso fortuito</li>
              <li>Problemas de conexão à internet do usuário</li>
            </ul>

            <h2>10. Limitação de Responsabilidade</h2>
            <p>
              A Anubis Tech não se responsabiliza por perdas ou danos resultantes do uso inadequado da plataforma, inserção de dados incorretos pelo usuário, decisões jurídicas tomadas com base nas informações do sistema, ou perda de dados causada por ação do próprio usuário.
            </p>
            <p>
              O sistema é uma ferramenta de gestão e <strong>não substitui o julgamento profissional do advogado</strong>.
            </p>

            <h2>11. Modificações no Serviço</h2>
            <p>
              A Anubis Tech reserva-se o direito de modificar, suspender ou descontinuar funcionalidades do serviço a qualquer momento, com aviso prévio de 30 dias para alterações significativas. Novos recursos podem ser adicionados sem aviso prévio.
            </p>

            <h2>12. Rescisão</h2>
            <p>
              Qualquer das partes pode rescindir o contrato mediante aviso prévio de 30 dias. A Anubis Tech pode rescindir imediatamente em caso de violação destes termos, inadimplência superior a 60 dias, ou uso fraudulento da plataforma.
            </p>

            <h2>13. Lei Aplicável e Foro</h2>
            <p>
              Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro da comarca de <strong>São Paulo/SP</strong> para dirimir quaisquer conflitos decorrentes deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>

            <h2>14. Contato</h2>
            <p>Para dúvidas ou questões sobre estes Termos de Uso:</p>
            <ul>
              <li><strong>E-mail:</strong> fernandohugoferreira@gmail.com</li>
              <li><strong>Telefone:</strong> (11) 96210-4871</li>
              <li><strong>Instagram:</strong> @anubis.tec</li>
            </ul>

          </div>
        </div>
      </div>
    </>
  )
}