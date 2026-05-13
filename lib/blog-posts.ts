export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  categoria: string
  imagem: string
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }

export const blogPosts: BlogPost[] = [
  {
    id: "nova-fase",
    slug: "escola-terra-terrinha-celebra-o-inicio-de-uma-nova-fase",
    title: "Escola Terra Terrinha celebra o início de uma nova fase",
    excerpt:
      "Desde 1998, a Terra Terrinha cultiva uma forma de educar que respeita a infância, valoriza os vínculos e coloca a criança no centro de tudo. Em 2025, vivemos uma nova fase: a evolução e a ampliação de um legado construído com famílias, educadores e crianças.",
    date: "Janeiro de 2026",
    categoria: "Novidades",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-celebra-o-inicio-de-uma-nova-fase-HHH9RQS8g8EGOH26qOgvMOwNgKy9kj.jpg",
    content: [
      {
        type: "paragraph",
        text: "Desde 1998, a Terra Terrinha cultiva uma forma de educar que respeita a infância, valoriza os vínculos e coloca a criança no centro de tudo. Ao longo do tempo, crescemos, aprendemos e nos transformamos, sem nunca abrir mão daquilo que nos trouxe até aqui: a escuta sensível, o afeto, o contato diário com a natureza, o brincar como linguagem e uma educação que forma pessoas inteiras. Hoje, vivemos uma nova fase. Uma fase que é a evolução, a continuidade e a ampliação de um legado construído com famílias, educadores e crianças.",
      },
      {
        type: "paragraph",
        text: "Em 2025, a Escola Terra Terrinha passou a integrar o Grupo Movimenta, uma conexão que fortalece nosso propósito e amplia nossa capacidade de oferecer experiências educativas transformadoras. Essa parceria traz novos recursos, novos projetos e novas possibilidades, sem perder a identidade que sempre nos guiou. Continuamos sendo a escola próxima, humana e sensível de sempre, agora com ainda mais possibilidades de caminhos para crescer.",
      },
      {
        type: "heading",
        text: "2026: tudo novo, para acolher, inspirar e transformar",
      },
      {
        type: "paragraph",
        text: "A Terra Terrinha se renovou em todos os sentidos: estrutura, ambientes, brinquedos, paisagismo e identidade visual. O projeto de arquitetura, assinado pela arquiteta Natalia Salcedo, do escritório Pieve, deu forma a espaços que dialogam profundamente com a infância, o brincar e o aprender. São ambientes pensados para envolver, provocar descobertas e ampliar as possibilidades de exploração e autonomia.",
      },
      {
        type: "paragraph",
        text: "A natureza segue sendo parte essencial do aprendizado na Terra Terrinha, agora de maneira ainda mais presente e intencional. O novo paisagismo, criado pela paisagista Cintia Rua, convida ao brincar livre, às experiências sensoriais e ao convívio com um espaço vivo, que ensina, acolhe e transforma diariamente. Na nossa proposta, o ambiente é compreendido como o terceiro educador, ao lado do professor e dos colegas.",
      },
      {
        type: "paragraph",
        text: "O novo projeto de brinquedos foi desenvolvido pela EbaPlay, empresa de Belo Horizonte referência nacional em estruturas lúdicas com propósito pedagógico. As peças unem intenção educativa, estética e funcionalidade, criando um ambiente que favorece a imaginação, o movimento e a construção de vínculos.",
      },
      {
        type: "heading",
        text: "Uma nova marca para representar o que sempre fomos",
      },
      {
        type: "paragraph",
        text: "Nossa nova identidade visual nasceu de um desejo profundo: representar, com beleza e verdade, tudo aquilo que faz a Terra Terrinha ser a escola que é. Cada pétala do símbolo carrega um dos quatro pilares que sustentam nossa essência: a comunidade, a família, a escola e a criança. Quando se unem, esses elementos formam a base de uma educação que valoriza vínculos, respeito, natureza, descobertas e o desenvolvimento integral de cada aluno.",
      },
      {
        type: "paragraph",
        text: "A marca mudou, os espaços mudaram, os brinquedos mudaram. Mas o propósito continua ainda mais forte: cuidar, educar e inspirar, criando experiências que acompanham cada fase da infância com amor, responsabilidade e encantamento.",
      },
      {
        type: "heading",
        text: "Terra Terrinha 2026: um espaço que inspira, ensina e transforma",
      },
      {
        type: "paragraph",
        text: "Muito mais do que uma nova fase, inauguramos um novo capítulo, construído com o mesmo cuidado de sempre, mas cheio de novas possibilidades para as crianças viverem, descobrirem, criarem e crescerem.",
      },
    ],
  },
  {
    id: "educacao-construtivista",
    slug: "educacao-construtivista-nossa-metodologia-na-pratica",
    title: "Educação construtivista: nossa metodologia na prática",
    excerpt:
      "Na Terra Terrinha, acreditamos que a criança é protagonista do próprio processo de aprendizagem. É ela quem investiga, formula hipóteses, testa caminhos, observa, erra, recomeça e descobre. Essa é a essência do construtivismo: aprender fazendo.",
    date: "Janeiro de 2026",
    categoria: "Pedagogia",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/educacao-construtivista-nossa-metodologia-na-pratica-MmisJxqV9uweaZbavoKi5cq8CzT06R.jpg",
    content: [
      {
        type: "paragraph",
        text: "Na Terra Terrinha, acreditamos que a criança é protagonista do próprio processo de aprendizagem. É ela quem investiga, formula hipóteses, testa caminhos, observa, erra, recomeça e descobre. Essa é a essência do construtivismo: aprender fazendo.",
      },
    ],
  },
  {
    id: "conexao-natureza",
    slug: "conexao-com-a-natureza-um-diferencial-pedagogico",
    title: "Conexão com a natureza: um diferencial pedagógico",
    excerpt:
      "Na Escola Terra Terrinha, a natureza não é apenas cenário: ela é parte viva do cotidiano, um território de descobertas, encantamento e aprendizado que amplia os sentidos e favorece um desenvolvimento mais completo, integral e humano.",
    date: "Janeiro de 2026",
    categoria: "Pedagogia",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conexao-com-a-natureza-um-diferencial-pedagogico-mIrU9WekGLDpcvfVMj2Qnx6pBywmeG.jpg",
    content: [
      {
        type: "paragraph",
        text: "Na Escola Terra Terrinha, a natureza não é apenas cenário: ela é parte viva do cotidiano, um território de descobertas, encantamento e aprendizado que amplia os sentidos e favorece um desenvolvimento mais completo, integral e humano.",
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug || p.id === slug)
}
