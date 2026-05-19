import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da Escola Terra Terrinha. Informações sobre coleta, uso, armazenamento e proteção de dados pessoais conforme a LGPD (Lei 13.709/18).",
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.escolaterra.com.br/politica' },
}

const sections = [
  {
    title: "Seção 1 – Informações Gerais",
    content: [
      "A presente Política de Privacidade contém informações sobre coleta, uso, armazenamento, tratamento e proteção dos dados pessoais dos usuários e visitantes do site escolaterra.com.br, com a finalidade de demonstrar absoluta transparência quanto ao assunto e esclarecer a todos interessados sobre os tipos de dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas informações pessoais.",
      "Esta Política de Privacidade aplica-se a todos os usuários e visitantes do site e integra os Termos e Condições Gerais de Uso do site devidamente inscrita no CNPJ sob o nº 02.823.061/0001-84, localizada na Avenida Arnaldo Biagioli, 745, no Bairro Pinheirinho, Vinhedo - SP, doravante nominada INSTITUTO DE EDUCACAO TERRA LTDA.",
      "O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18), o Marco Civil da Internet (Lei 12.965/14) (e o Regulamento da UE n. 2016/6790). Ainda, o documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.",
    ],
  },
  {
    title: "Seção 2 – Como Recolhemos os Dados Pessoais do Usuário e do Visitante?",
    content: [
      "Os dados pessoais do usuário e visitante são recolhidos pela plataforma da seguinte forma:",
    ],
    bullets: [
      "Quando o usuário nos envia uma mensagem: esses dados são os dados de identificação básicos, como: e-mail, nome completo e telefone. A partir deles, podemos identificar o usuário e o visitante, além de garantir uma maior segurança e bem-estar às suas necessidades.",
      "Quando um usuário e visitante acessa páginas do site: as informações sobre interação e acesso são coletadas pela empresa para garantir uma melhor experiência ao usuário e visitante. Estes dados podem tratar sobre as palavras-chaves utilizadas em uma busca, o compartilhamento de um documento específico, comentários, visualizações de páginas, perfis, a URL de onde o usuário e visitante provêm, o navegador que utilizam e seus IPs de acesso, dentre outras que poderão ser armazenadas e retidas.",
      "Por intermédio de terceiro: as plataformas Facebook e Google recebem dados de terceiros, como quando o visitante do site interage com páginas específicas do site e conseguimos capturar esses dados. A utilização desses dados é autorizada previamente pelos usuários junto ao terceiro em questão.",
    ],
  },
  {
    title: "Seção 3 – Quais Dados Pessoais Recolhemos sobre o Usuário e Visitante?",
    content: [
      "Os dados pessoais do usuário e visitante recolhidos são os seguintes:",
    ],
    bullets: [
      "Dados para otimização da navegação: acesso a páginas, palavras-chave utilizadas na busca, recomendações, comentários, interação com outros perfis e usuários, perfis seguidos, endereço de IP.",
      "Newsletter: o e-mail cadastrado pelo visitante que optar por se inscrever na Newsletter será coletado e armazenado até que o usuário solicite o descadastro.",
    ],
  },
  {
    title: "Seção 4 – Para Que Finalidades Utilizamos os Dados Pessoais do Usuário e Visitante?",
    content: [
      "Os dados pessoais do usuário e do visitante coletados e armazenados pelo site tem por finalidade:",
    ],
    bullets: [
      "Bem-estar do usuário e visitante: aprimorar o produto e/ou serviço oferecido, facilitar, agilizar e cumprir os compromissos estabelecidos entre o usuário e a empresa, melhorar a experiência dos usuários e fornecer funcionalidades específicas a depender das características básicas do usuário.",
      "Melhorias da plataforma: compreender como o usuário utiliza os serviços da plataforma, para ajudar no desenvolvimento de negócios e técnicas.",
      "Anúncios: apresentar anúncios personalizados para o usuário com base nos dados fornecidos.",
      "Comercial: os dados são usados para personalizar o conteúdo oferecido e gerar subsídio à plataforma para a melhora da qualidade no funcionamento dos serviços.",
      "Previsão do perfil do usuário: tratamento automatizados de dados pessoais para avaliar o uso na plataforma.",
    ],
    footer: "O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia ao usuário, de modo que os direitos e obrigações aqui previstos permanecem aplicáveis.",
  },
  {
    title: "Seção 5 – Por Quanto Tempo os Dados Pessoais Ficam Armazenados?",
    content: [
      "Os dados pessoais do usuário e visitante são armazenados pela plataforma durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.",
      "Os dados podem ser removidos ou anonimizados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento.",
      "Ainda, os dados pessoais dos usuários apenas podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:",
    ],
    numbered: [
      "Cumprimento de obrigação legal ou regulatória pelo controlador;",
      "Estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;",
      "Transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei;",
      "Uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.",
    ],
  },
  {
    title: "Seção 6 – Segurança dos Dados Pessoais Armazenados",
    content: [
      "A plataforma se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.",
      "A plataforma não se exime de responsabilidade por culpa exclusiva de terceiro, como em caso de ataque de hackers ou crackers, ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere seus dados a terceiros. O site se compromete a comunicar o usuário em caso de alguma violação de segurança dos seus dados pessoais.",
      "Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.",
    ],
  },
  {
    title: "Seção 7 – Os Dados Pessoais Armazenados Serão Transferidos a Terceiros?",
    content: [
      "Os dados pessoais não podem ser compartilhados com terceiros.",
    ],
  },
  {
    title: "Seção 8 – Cookies ou Dados de Navegação",
    content: [
      "Os cookies referem-se a arquivos de texto enviados pelo site ao computador do usuário e visitante e que nele ficam armazenados, com informações relacionadas à navegação no site. Tais informações são relacionadas aos dados de acesso como local e horário de acesso e são armazenadas pelo navegador do usuário e visitante para que o servidor da plataforma possa lê-las posteriormente a fim de personalizar os serviços da plataforma.",
      "O usuário e o visitante do site manifesta conhecer e aceitar que pode ser utilizado um sistema de coleta de dados de navegação mediante à utilização de cookies.",
      "O cookie persistente permanece no disco rígido do usuário e visitante depois que o navegador é fechado e será usado pelo navegador em visitas subsequentes ao site. Os cookies persistentes podem ser removidos seguindo as instruções do seu navegador. Já o cookie de sessão é temporário e desaparece depois que o navegador é fechado. É possível redefinir seu navegador da web para recusar todos os cookies, porém alguns recursos da plataforma podem não funcionar corretamente se a capacidade de aceitar cookies estiver desabilitada.",
    ],
  },
  {
    title: "Seção 9 – Consentimento",
    content: [
      "Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade.",
      "O usuário tem direito de retirar o seu consentimento a qualquer tempo, para tanto deve entrar em contato através do telefone (19) 3886-3898.",
    ],
  },
  {
    title: "Seção 10 – Alterações para Essa Política de Privacidade",
    content: [
      "Reservamos o direito de modificar essa Política de Privacidade a qualquer momento, então, é recomendável que o usuário e visitante revise-a com frequência.",
      "As alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação na plataforma. Quando realizadas alterações os usuários serão notificados. Ao utilizar o serviço ou fornecer informações pessoais após eventuais modificações, o usuário e visitante demonstra sua concordância com as novas normas.",
      "Diante da fusão ou venda da plataforma à outra empresa os dados dos usuários podem ser transferidas para os novos proprietários para que a permanência dos serviços oferecidos.",
    ],
  },
  {
    title: "Seção 11 – Jurisdição para Resolução de Conflitos",
    content: [
      "Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.",
      "Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede da empresa.",
    ],
  },
]

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao site
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">
              Política de Privacidade
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex flex-col gap-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="flex flex-col gap-3 text-muted-foreground text-sm leading-relaxed">
                    {section.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="flex flex-col gap-2 pl-4 list-disc">
                        {section.bullets.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.numbered && (
                      <ol className="flex flex-col gap-2 pl-4 list-[upper-roman]">
                        {section.numbered.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    )}
                    {section.footer && (
                      <p>{section.footer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
