export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  categoria: string
  imagem: string
  imagemOrientation?: "landscape" | "portrait"
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; url: string; alt: string }

export const blogPosts: BlogPost[] = [
  {
    id: "sergio-merli-entrevista",
    slug: "sergio-merli-fala-sobre-literatura-infancia-e-experiencias-para-alem-das-telas",
    title: "Sergio Merli fala sobre literatura, infância e experiências para além das telas",
    excerpt:
      "Uma conversa sobre leitura, imaginação, contato com as crianças e reflexão sobre o uso das tecnologias digitais com o autor de A Coruja, o Urso e o Celular, lançado na Escola Terra Terrinha.",
    date: "Setembro de 2026",
    categoria: "Educação",
    imagem:
      "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Sergio%20Merli%20fala%20sobre%20literatura%2C%20inf%C3%A2ncia%20e%20experi%C3%AAncias%20para%20al%C3%A9m%20das%20telas/11.jpeg",
    content: [
      {
        type: "heading",
        text: "Sergio Merli fala sobre literatura, infância e experiências para além das telas",
      },
      {
        type: "paragraph",
        text: "O lançamento de A Coruja, o Urso e o Celular foi um momento especial na Escola Terra Terrinha. Diante de crianças, famílias e educadores, o escritor e ilustrador Sergio Merli apresentou uma obra que convida leitores de diferentes idades a observar, imaginar e refletir sobre a relação com as telas.",
      },
      {
        type: "paragraph",
        text: "Em entrevista, o autor fala sobre a importância de lançar um livro em uma escola, a relação da literatura com a infância, o contato próximo com as crianças e as famílias e as experiências que ajudam a ampliar o olhar para além das telas.",
      },
      {
        type: "heading",
        text: "Literatura como encontro e experiência",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Sergio%20Merli%20fala%20sobre%20literatura%2C%20inf%C3%A2ncia%20e%20experi%C3%AAncias%20para%20al%C3%A9m%20das%20telas/8.png",
        alt: "A Coruja, o Urso e o Celular, de Sérgio Merli",
      },
      {
        type: "paragraph",
        text: "\"Para um autor, a chegada de um novo livro é sempre um momento especial. Quando esse lançamento acontece em uma escola, cercado por crianças, educadores e famílias, ele ganha um significado ainda maior. É a oportunidade de ver a obra encontrar seus primeiros leitores e de transformar a leitura em uma experiência de troca, conversa e descoberta\", conta Sergio Merli.",
      },
      {
        type: "paragraph",
        text: "\"O lançamento de A Coruja, o Urso e o Celular foi um encontro muito proveitoso, que despertou boas conversas entre alunos, educadores e famílias sobre um tema tão presente no cotidiano de todos nós.\"",
      },
      {
        type: "paragraph",
        text: "Sobre a relação entre literatura e infância, o autor destaca que a literatura cria espaços de imaginação, escuta e troca. \"Quando converso com as crianças, percebo que cada uma se relaciona com a história de uma maneira diferente. Suas perguntas, interpretações e comentários mostram como a leitura pode estimular a curiosidade e ampliar a forma de observar o mundo.\"",
      },
      {
        type: "heading",
        text: "Um livro para observar e conversar",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Sergio%20Merli%20fala%20sobre%20literatura%2C%20inf%C3%A2ncia%20e%20experi%C3%AAncias%20para%20al%C3%A9m%20das%20telas/9.png",
        alt: "Trecho do livro A Coruja, o Urso e o Celular, de Sérgio Merli",
      },
      {
        type: "paragraph",
        text: "Construído apenas com imagens, o livro convida o leitor a participar da construção da narrativa. \"Cada pessoa observa detalhes diferentes, interpreta as cenas a partir de suas próprias experiências e, muitas vezes, percebe elementos que passaram despercebidos por outros leitores. Essa participação torna a leitura mais ativa e muito rica\", explica.",
      },
      {
        type: "paragraph",
        text: "\"Espero que A Coruja, o Urso e o Celular estimule conversas sobre nossos hábitos com as tecnologias digitais, sem transformar o celular em um vilão. A intenção é que leitores de diferentes idades possam observar as escolhas feitas pelos personagens, comparar suas atitudes e refletir sobre como usamos esses recursos em nosso dia a dia.\"",
      },
      {
        type: "paragraph",
        text: "Sobre o título, o autor conta que ele surgiu durante o desenvolvimento da narrativa visual. \"A coruja e o urso foram ganhando personalidade ao longo do processo, e o celular acabou se tornando o terceiro elemento indispensável do título, porque representa o tema que aproxima e, ao mesmo tempo, diferencia os dois personagens.\"",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Sergio%20Merli%20fala%20sobre%20literatura%2C%20inf%C3%A2ncia%20e%20experi%C3%AAncias%20para%20al%C3%A9m%20das%20telas/10.png",
        alt: "O autor Sérgio Merli durante o desenvolvimento da narrativa visual",
      },
      {
        type: "paragraph",
        text: "Ao ser perguntado sobre qual reflexão espera que permaneça depois que o leitor fechar o livro, Sergio responde: \"Gostaria que o leitor fechasse o livro se perguntando: 'Como é a minha relação com o celular e com as outras telas?' Não espero que todos cheguem à mesma conclusão. Meu desejo é apenas que essa pergunta continue acompanhando o leitor e gere boas conversas em casa, na escola e entre amigos.\"",
      },
      {
        type: "paragraph",
        text: "\"A literatura nem sempre existe para oferecer respostas. Muitas vezes, ela nos ajuda a fazer perguntas melhores. Se o livro conseguir despertar essa reflexão de maneira leve, sensível e sem julgamentos, acredito que ele terá cumprido seu papel.\"",
      },
      {
        type: "paragraph",
        text: "Na Escola Terra Terrinha, o encontro com Sergio Merli reforçou que a literatura pode abrir espaço para a imaginação, a conversa e a reflexão. Uma experiência construída com presença, afeto e participação, para além das telas.",
      },
      {
        type: "heading",
        text: "Matrículas e rematrículas para 2027",
      },
      {
        type: "paragraph",
        text: "As rematrículas para 2027 já estão abertas, assim como as matrículas para novas famílias. O Programa de Indicação oferece 10% de desconto em uma mensalidade quando a indicação resulta em uma nova matrícula. Para saber mais, fale com a equipe da escola.",
      },
    ],
  },
  {
    id: "dia-da-familia-2026",
    slug: "dia-da-familia-na-escola-terra-terrinha-celebra-encontros-e-descobertas",
    title: "Dia da Família na Escola Terra Terrinha celebra encontros e descobertas",
    excerpt:
      "No sábado, 29 de agosto, a Escola Terra Terrinha recebeu crianças, famílias e educadores para uma manhã de convivência, literatura, brincadeiras e descobertas.",
    date: "Setembro de 2026",
    categoria: "Eventos",
    imagem:
      "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Dia%20da%20Fam%C3%ADlia%20na%20Escola%20Terra%20Terrinha%20celebra%20encontros%20e%20descobertas/6.png",
    imagemOrientation: "landscape",
    content: [
      {
        type: "heading",
        text: "Dia da Família na Escola Terra Terrinha celebra encontros e descobertas",
      },
      {
        type: "paragraph",
        text: "No sábado, 29 de agosto, a Escola Terra Terrinha recebeu crianças, famílias e educadores para uma manhã de convivência, literatura, brincadeiras e descobertas.",
      },
      {
        type: "paragraph",
        text: "O encontro aproximou as famílias do cotidiano escolar e reforçou uma proposta baseada no acolhimento, na escuta, na curiosidade e na participação das crianças.",
      },
      {
        type: "heading",
        text: "Literatura, conversa e conquistas",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Sergio%20Merli%20fala%20sobre%20literatura%2C%20inf%C3%A2ncia%20e%20experi%C3%AAncias%20para%20al%C3%A9m%20das%20telas/11.jpeg",
        alt: "A Coruja, o Urso e o Celular, do escritor e ilustrador Sergio Merli",
      },
      {
        type: "paragraph",
        text: "A programação contou com o lançamento do livro A Coruja, o Urso e o Celular, do escritor e ilustrador Sergio Merli. O autor conversou com as famílias, participou de uma oficina de desenho e autografou exemplares.",
      },
      {
        type: "paragraph",
        text: "Construído apenas com imagens, o livro convida crianças e adultos a observar, imaginar e refletir sobre a relação com as telas e a tecnologia.",
      },
      {
        type: "paragraph",
        text: "As famílias também participaram de um bate papo com a psicopedagoga Priscila Sollito, que abordou temas como presença, escuta, autonomia e vínculos.",
      },
      {
        type: "paragraph",
        text: "A manhã contou ainda com a cerimônia de Mudança de Faixa no Kung Fu. As crianças celebraram suas conquistas e demonstraram os resultados de sua dedicação, disciplina e perseverança.",
      },
      {
        type: "heading",
        text: "A visita especial da Luna",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Dia%20da%20Fam%C3%ADlia%20na%20Escola%20Terra%20Terrinha%20celebra%20encontros%20e%20descobertas/7.png",
        alt: "As crianças puderam conhecer a Luna, do O Show da Luna",
      },
      {
        type: "paragraph",
        text: "Outro destaque foi a presença da Luna, de \"O Show da Luna!\". As crianças puderam conhecer a personagem, tirar fotos e viver um momento de alegria e encantamento.",
      },
      {
        type: "paragraph",
        text: "A visita também reforçou a importância de observar, perguntar, investigar e compartilhar descobertas, valores presentes no cotidiano da Terra Terrinha.",
      },
      {
        type: "heading",
        text: "Matrículas e rematrículas para 2027",
      },
      {
        type: "paragraph",
        text: "As rematrículas para 2027 já estão abertas, assim como as matrículas para novas famílias. O Programa de Indicação oferece 10% de desconto em uma mensalidade quando a indicação resulta em uma nova matrícula. Para saber mais, fale com a equipe da escola.",
      },
      {
        type: "paragraph",
        text: "O Dia da Família fortaleceu os vínculos entre crianças, famílias e educadores. Foi uma alegria celebrar a infância com presença, afeto, literatura, curiosidade e novas conquistas.",
      },
    ],
  },
  {
    id: "luna-terra-terrinha",
    slug: "terra-terrinha-recebe-luna-em-um-encontro-cheio-de-alegria-e-descobertas",
    title: "Terra Terrinha recebe Luna em um encontro cheio de alegria e descobertas",
    excerpt:
      "A Escola Terra Terrinha recebeu uma visita muito especial: Luna, personagem de O Show da Luna!. Conhecida por sua curiosidade, ela encantou as crianças e trouxe ainda mais alegria para a rotina escolar.",
    date: "Setembro de 2026",
    categoria: "Eventos",
    imagem:
      "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Terra%20Terrinha%20recebe%20Luna%20em%20um%20encontro%20cheio%20de%20alegria%20e%20descobertas/1.png",
    imagemOrientation: "landscape",
    content: [
      {
        type: "heading",
        text: "Terra Terrinha recebe Luna em um encontro cheio de alegria e descobertas",
      },
      {
        type: "paragraph",
        text: "A Escola Terra Terrinha recebeu uma visita muito especial: Luna, personagem de O Show da Luna!. Conhecida por sua curiosidade e pelo entusiasmo em descobrir como as coisas funcionam, Luna encantou as crianças e trouxe ainda mais alegria para a rotina escolar.",
      },
      {
        type: "paragraph",
        text: "Com olhares atentos, sorrisos e muita animação, os alunos observaram cada detalhe e participaram do encontro de maneira espontânea e afetiva. A visita proporcionou uma experiência diferente e significativa, repleta de encantamento e descobertas.",
      },
      {
        type: "heading",
        text: "A curiosidade como ponto de partida",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Terra%20Terrinha%20recebe%20Luna%20em%20um%20encontro%20cheio%20de%20alegria%20e%20descobertas/2.png",
        alt: "Conhecida por sua curiosidade, Luna despertou o interesse das crianças durante a visita à Terra Terrinha",
      },
      {
        type: "paragraph",
        text: "As crianças aprendem quando observam, questionam e buscam compreender o mundo ao seu redor. Cada pergunta pode abrir novos caminhos para a descoberta e estimular a imaginação, a interação e o desejo de aprender.",
      },
      {
        type: "paragraph",
        text: "Ao vivenciarem uma situação nova, os alunos tiveram a oportunidade de observar, conversar e expressar suas percepções. Os olhares atentos, os comentários e os sorrisos revelaram o envolvimento das crianças com aquele momento especial.",
      },
      {
        type: "heading",
        text: "Luna e o encantamento da infância",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Terra%20Terrinha%20recebe%20Luna%20em%20um%20encontro%20cheio%20de%20alegria%20e%20descobertas/3.png",
        alt: "A presença da personagem aproximou o universo da imaginação das experiências vividas na escola",
      },
      {
        type: "paragraph",
        text: "Luna é uma personagem que valoriza a curiosidade e o desejo de descobrir. Sua visita à Terra Terrinha criou uma atmosfera de encantamento e permitiu que as crianças se aproximassem de um universo que faz parte do imaginário infantil.",
      },
      {
        type: "paragraph",
        text: "Mais do que uma presença diferente no ambiente escolar, o encontro foi uma oportunidade de celebrar a infância e valorizar experiências que despertam emoções, perguntas e novas possibilidades.",
      },
      {
        type: "heading",
        text: "Uma experiência vivida com alegria",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Terra%20Terrinha%20recebe%20Luna%20em%20um%20encontro%20cheio%20de%20alegria%20e%20descobertas/4.png",
        alt: "Crianças e educadores compartilharam um momento de interação, afeto e muitas descobertas",
      },
      {
        type: "paragraph",
        text: "A alegria dos alunos tornou a visita ainda mais especial. Entre sorrisos, olhares curiosos e muita animação, as crianças aproveitaram cada instante da experiência.",
      },
      {
        type: "paragraph",
        text: "Momentos como esse mostram que aprender também pode envolver surpresa, brincadeira, afeto e encantamento. Quando as crianças participam de vivências significativas, elas ampliam sua percepção e constroem memórias que permanecem.",
      },
      {
        type: "heading",
        text: "Um encontro para guardar na memória",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Terra%20Terrinha%20recebe%20Luna%20em%20um%20encontro%20cheio%20de%20alegria%20e%20descobertas/5.png",
        alt: "A coordenadora de Marketing do Grupo Movimenta, Luciana Ribeiro, ao lado de Luna",
      },
      {
        type: "paragraph",
        text: "A visita de Luna deixou uma lembrança especial na Terra Terrinha. Foi um encontro marcado pela curiosidade, pela imaginação e pela alegria das crianças.",
      },
      {
        type: "paragraph",
        text: "Na escola, cada experiência pode se transformar em uma oportunidade de observar, interagir e descobrir. E, naquele dia, a presença de Luna mostrou que a curiosidade pode começar com um simples olhar e se transformar em muitas novas perguntas.",
      },
      {
        type: "heading",
        text: "Matrículas e rematrículas para 2027",
      },
      {
        type: "paragraph",
        text: "As rematrículas para 2027 estão abertas para as famílias que desejam continuar essa história na Escola Terra Terrinha. Para quem busca uma escola para começar uma nova jornada, a equipe também está disponível para apresentar as condições de matrícula.",
      },
      {
        type: "paragraph",
        text: "O Programa de Indicação ainda oferece 10% de desconto em uma mensalidade quando uma indicação resulta em uma nova matrícula. Para conhecer as regras, entre em contato com a escola.",
      },
    ],
  },
  {
    id: "corrida-meu-primeiro-super-heroi",
    slug: "corrida-com-meu-primeiro-super-heroi-reune-familias-na-terra-terrinha",
    title: "Corrida com Meu Primeiro Super-Herói reúne famílias na Terra Terrinha",
    excerpt:
      "A Terra Terrinha viveu uma manhã muito especial com a Corrida com Meu Primeiro Super-Herói, reunindo as turmas da Educação Infantil e do Ensino Fundamental em um momento cheio de diversão, carinho e alegria.",
    date: "Agosto de 2026",
    categoria: "Eventos",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Dia-dos-Pais.png",
    content: [
      {
        type: "heading",
        text: "Corrida com Meu Primeiro Super-Herói reúne famílias na Terra Terrinha",
      },
      {
        type: "paragraph",
        text: "A Terra Terrinha viveu uma manhã muito especial com a Corrida com Meu Primeiro Super-Herói. O encontro reuniu as turmas da Educação Infantil e do Ensino Fundamental em um momento cheio de diversão, carinho e alegria.",
      },
      {
        type: "paragraph",
        text: "Pais, mães, crianças e familiares ocuparam a quadra e outros espaços da escola para correr, brincar e aproveitar o tempo juntos. A manhã teve corrida, torcida, abraços e muitos sorrisos.",
      },
      {
        type: "paragraph",
        text: "Mais do que uma atividade esportiva, a corrida foi uma oportunidade para fortalecer os vínculos entre as crianças e suas famílias. Cada momento foi vivido com entusiasmo, desde a preparação para a corrida até a comemoração ao lado de quem estava ali para participar e torcer.",
      },
      {
        type: "heading",
        text: "Um momento para estar junto",
      },
      {
        type: "paragraph",
        text: "Na Terra Terrinha, acreditamos que estar presente na vida das crianças faz toda a diferença. Por isso, encontros como esse são tão importantes.",
      },
      {
        type: "paragraph",
        text: "Brincar, correr, explorar e compartilhar experiências são formas simples e muito especiais de criar memórias. Quando esses momentos acontecem ao lado de quem amamos, eles se tornam ainda mais significativos.",
      },
      {
        type: "paragraph",
        text: "A Corrida com Meu Primeiro Super-Herói também mostrou que a infância pode ser vivida com movimento, afeto e muita diversão. Cada família participou à sua maneira e ajudou a tornar a manhã ainda mais bonita.",
      },
      {
        type: "heading",
        text: "Memórias que ficam",
      },
      {
        type: "paragraph",
        text: "As melhores lembranças da infância muitas vezes nascem de momentos simples. Uma corrida de mãos dadas, uma torcida animada, um abraço apertado ou uma brincadeira em família podem ficar guardados para sempre.",
      },
      {
        type: "paragraph",
        text: "Foi muito bom receber as famílias na Terra Terrinha e compartilhar uma manhã tão alegre. Agradecemos a todos os pais e familiares que estiveram conosco e fizeram parte desse encontro.",
      },
      {
        type: "paragraph",
        text: "Que essa seja uma das muitas experiências especiais vividas em família na escola!",
      },
    ],
  },
  {
    id: "alegria-do-reencontro-volta-as-aulas",
    slug: "a-alegria-do-reencontro-marca-a-volta-as-aulas",
    title: "A alegria do reencontro marca a volta às aulas",
    excerpt:
      "Depois de um período de descanso, brincadeiras e novas experiências em família, é hora de reencontrar os amigos, os professores e a escola. É com muita alegria que damos as boas-vindas às nossas crianças e famílias para o segundo semestre letivo!",
    date: "Agosto de 2026",
    categoria: "Novidades",
    imagem:
      "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/Bem%20vindos%20de%20volta_ETT%20Blog%202.jpg.jpeg",
    content: [
      {
        type: "heading",
        text: "A alegria do reencontro marca a volta às aulas",
      },
      {
        type: "paragraph",
        text: "Depois de um período de descanso, brincadeiras e novas experiências em família, é hora de reencontrar os amigos, os professores e a escola. É com muita alegria que damos as boas-vindas às nossas crianças e famílias para o segundo semestre letivo!",
      },
      {
        type: "paragraph",
        text: "Na Terra Terrinha, acreditamos que aprender vai muito além da sala de aula. A aprendizagem se constrói nas relações, nas descobertas, nas brincadeiras, nas investigações e nas experiências vividas ao longo do dia. Por isso, nossos espaços foram preparados com muito carinho para acolher os estudantes e inspirar novas conquistas.",
      },
      {
        type: "paragraph",
        text: "Será mais uma oportunidade para fortalecer vínculos, ampliar conhecimentos e respeitar o tempo, a curiosidade e a singularidade de cada criança.",
      },
      {
        type: "paragraph",
        text: "Seguimos contando com a parceria das famílias, que caminham ao nosso lado na construção de uma educação significativa e transformadora.",
      },
      {
        type: "paragraph",
        text: "Que este novo semestre letivo seja leve, inspirador e repleto de descobertas. Estamos muito felizes em receber nossas crianças e suas famílias para mais um capítulo dessa jornada.",
      },
      {
        type: "paragraph",
        text: "Sejam todos muito bem-vindos!",
      },
    ],
  },
  {
    id: "sexto-ano-terra-terrinha",
    slug: "o-6-ano-e-nosso-a-terra-terrinha-segue-crescendo-com-voce",
    title: "O 6º ano é nosso: a Terra Terrinha segue crescendo com você",
    excerpt:
      "Em 2027, a Terra Terrinha dará mais um passo em sua trajetória com a inauguração do 6º ano do Ensino Fundamental Anos Finais, permitindo que as crianças continuem crescendo em uma escola que já conhecem e à qual pertencem.",
    date: "Julho de 2026",
    categoria: "Novidades",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/sexto-ano-terra-terrinha/cover-image.jpg",
    content: [
      {
        type: "heading",
        text: "O 6º ano é nosso: a Terra Terrinha segue crescendo com você",
      },
      {
        type: "paragraph",
        text: "Há algo muito significativo em uma escola que cresce no mesmo ritmo das suas crianças. Em 2027, a Terra Terrinha caminhará mais um passo nessa direção: a inauguração do 6º ano do Ensino Fundamental Anos Finais, uma nova etapa que chega com a mesma essência que sempre orientou tudo o que fazemos aqui.",
      },
      {
        type: "paragraph",
        text: "A notícia é grande, mas a ideia por trás dela é simples: as crianças que cresceram na Terra Terrinha merecem continuar crescendo nela.",
      },
      {
        type: "heading",
        text: "Uma transição que merece atenção",
      },
      {
        type: "paragraph",
        text: "A passagem do Fundamental I para o Fundamental II é um dos momentos mais delicados da vida escolar. As crianças chegam a essa etapa em plena transformação, física, emocional e cognitiva, e o ambiente em que vivem essa transição faz toda a diferença. Chegar ao 6º ano num espaço que já conhecem, com educadores que entendem sua história e uma comunidade que é sua, muda o que essa experiência significa.",
      },
      {
        type: "heading",
        text: "A mesma escola, uma nova etapa",
      },
      {
        type: "paragraph",
        text: "A chegada do 6º ano não é uma ruptura. É uma continuidade. A proposta pedagógica que guiou cada etapa anterior segue sendo o fio condutor: o olhar atento para cada criança, a aprendizagem com significado, a parceria com as famílias e a certeza de que pertencer a uma comunidade é parte essencial de qualquer processo educativo.",
      },
    ],
  },
  {
    id: "festa-junina-2026",
    slug: "sao-joao-quando-a-escola-vira-festa-e-a-festa-vira-memoria",
    title: "São João: quando a escola vira festa e a festa vira memória",
    excerpt:
      "No dia 20 de junho, a Terra Terrinha reuniu mais de 650 pessoas para celebrar a Festa Junina 2026, inspirada no Bumba Meu Boi e construída com a participação ativa de toda a comunidade escolar.",
    date: "Junho de 2026",
    categoria: "Eventos",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/festa-junina-2026/cover.jpg",
    content: [
      {
        type: "heading",
        text: "São João: quando a escola vira festa e a festa vira memória",
      },
      {
        type: "paragraph",
        text: "No dia 20 de junho, a Terra Terrinha viveu um dos seus momentos mais bonitos do ano. A Festa Junina 2026 reuniu mais de 650 pessoas em torno de um tema que carrega história, simbolismo e muita vida: o Bumba Meu Boi.",
      },
      {
        type: "paragraph",
        text: "Mais do que uma celebração, foi um encontro. Famílias, crianças, educadores, colaboradores e amigos chegaram juntos para vivenciar algo que foi construído com as mãos e o afeto de mais de 200 pessoas. A decoração, os detalhes, a atmosfera do dia, tudo teve a participação ativa da comunidade escolar. E é exatamente nisso que a Terra Terrinha acredita: que a educação se faz junto, dentro e fora da sala de aula.",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/festa-junina-2026/image2.jpeg",
        alt: "São João: quando a escola vira festa e a festa vira memória",
      },
      {
        type: "heading",
        text: "Um tema, uma história",
      },
      {
        type: "paragraph",
        text: "O Bumba Meu Boi não é só uma festa. É uma das manifestações culturais mais ricas e expressivas do Brasil, cheia de simbolismo, personagens e tradição oral. Trazer esse tema para o centro da celebração foi uma forma de aproximar as crianças de uma herança cultural que é delas, que é nossa, e que merece ser vivida com alegria e respeito.",
      },
      {
        type: "heading",
        text: "As crianças no centro do palco",
      },
      {
        type: "paragraph",
        text: "As apresentações emocionaram. Com encanto e presença, as crianças trouxeram para o palco a riqueza da cultura popular brasileira, celebrando o Bumba Meu Boi com a autenticidade que só a infância é capaz de oferecer. Música, dança, cor e alegria se misturaram num sábado que o sol fez questão de abençoar.",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/festa-junina-2026/image2.jpg",
        alt: "As crianças no centro do palco",
      },
      {
        type: "heading",
        text: "Uma memória que fica",
      },
      {
        type: "paragraph",
        text: "Entre brincadeiras, abraços e sorrisos compartilhados, centenas de memórias foram criadas. O tipo de memória que aquece e que faz uma criança lembrar, muitos anos depois, do cheiro de festa, da animação dos colegas e da sensação de pertencer a algo maior.",
      },
      {
        type: "paragraph",
        text: "Agradecemos a cada um que esteve presente, que ajudou a montar, que aplaudiu, que dançou e que fez deste dia algo inesquecível. A festa foi grande porque vocês são muitos. E bonita porque vocês são especiais.",
      },
      {
        type: "heading",
        text: "Até o próximo ano!",
      },
    ],
  },
  {
    id: "dia-das-familias-na-escola",
    slug: "dia-das-familias-na-escola-quando-pertencer-faz-toda-a-diferenca",
    title: "Dia das Famílias na Escola: quando pertencer faz toda a diferença",
    excerpt:
      "O Dia das Famílias na Escola reuniu alunos, pais, mães e responsáveis em uma manhã de convivência, brincadeiras e experiências compartilhadas, fortalecendo os laços entre família, escola e comunidade.",
    date: "Junho de 2026",
    categoria: "Eventos",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/dia-das-familias-na-escola/Diadafam%C3%ADlia.jpeg",
    content: [
      {
        type: "heading",
        text: "Dia das Famílias na Escola: quando pertencer faz toda a diferença",
      },
      {
        type: "paragraph",
        text: "Maio se despediu da Terra Terrinha da melhor forma possível: com uma manhã dedicada às famílias. O Dia das Famílias na Escola reuniu alunos, pais, mães e responsáveis em torno de algo simples e poderoso ao mesmo tempo: o estar junto.",
      },
      {
        type: "paragraph",
        text: "Famílias e crianças participaram de diferentes atividades, compartilhando brincadeiras, descobertas e experiências que só ganham sentido quando vividas lado a lado. Não havia separação entre quem ensina e quem aprende. Havia encontro.",
      },
      {
        type: "heading",
        text: "Um espaço preparado com cuidado",
      },
      {
        type: "paragraph",
        text: "Nada do que aconteceu naquele dia foi por acaso. Por trás de cada detalhe, estava o trabalho dedicado de toda a equipe da Terra Terrinha, que preparou o momento com sensibilidade e afeto para acolher cada família da melhor forma.",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/dia-das-familias-na-escola/DiadasFam%C3%ADliasnaEscola.jpeg",
        alt: "Um espaço preparado com cuidado",
      },
      {
        type: "paragraph",
        text: "Esse cuidado na preparação é, em si, uma expressão da proposta da escola: a de que a educação acontece em cada gesto, em cada escolha, em cada ambiente cuidadosamente pensado para quem o habita.",
      },
      {
        type: "heading",
        text: "Casa e escola, juntas",
      },
      {
        type: "paragraph",
        text: "A Terra Terrinha acredita que a infância se constrói em comunidade. E o Dia das Famílias na Escola é uma das expressões mais bonitas dessa crença.",
      },
      {
        type: "paragraph",
        text: "Quando a família entra na escola não apenas para reuniões, mas para brincar, criar e aprender junto com as crianças, algo especial acontece: os laços se fortalecem, o pertencimento se aprofunda e a criança percebe que os mundos que ela mais ama estão, afinal, conectados.",
      },
      {
        type: "paragraph",
        text: "Que essa manhã seja mais uma memória bonita na história de cada família que passou por aqui. E que a gente siga construindo juntos uma infância cheia de significado.",
      },
    ],
  },
  {
    id: "reggio-emilia",
    slug: "terra-terrinha-em-reggio-emilia-um-encontro-com-as-origens-da-nossa-inspiracao-pedagogica",
    title: "Terra Terrinha em Reggio Emilia: um encontro com as origens da nossa inspiração pedagógica",
    excerpt:
      "No mês de maio, a Escola Terra Terrinha esteve representada em Reggio Emilia, na Itália, por Ana Cláudia Rocha e Susy Vieira, que participaram do Grupo de Aprofundamento da América Latina, uma experiência formativa realizada em colaboração com a Reggio Children.",
    date: "Junho de 2026",
    categoria: "Novidades",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto-reggio-fgk7dpLEOUMPRdXsQ4KufKhXLRaR5E.webp",
    content: [
      {
        type: "paragraph",
        text: "No mês de maio, a Escola Terra Terrinha esteve representada em Reggio Emilia, na Itália, por Ana Cláudia Rocha e Susy Vieira, que participaram do Grupo de Aprofundamento da América Latina, uma experiência formativa realizada em colaboração com a Reggio Children e promovida pela RedSOLARE Brasil.",
      },
      {
        type: "paragraph",
        text: "Reconhecida mundialmente por sua abordagem educacional voltada à escuta, à investigação e ao protagonismo das crianças, Reggio Emilia é uma referência para educadores de diversos países e uma importante inspiração para o projeto pedagógico da Terra Terrinha.",
      },
      {
        type: "paragraph",
        text: "Durante a imersão, realizada no Centro Internacional Loris Malaguzzi, educadores de diferentes países da América Latina compartilharam experiências, estudos e reflexões sobre infância, ambientes de aprendizagem, documentação pedagógica, processos investigativos e a construção de conhecimento nas relações entre crianças, adultos e comunidade.",
      },
      {
        type: "paragraph",
        text: "Mais do que conhecer práticas e espaços educativos, a experiência proporcionou um tempo de presença, observação e aprofundamento. Um convite a olhar a infância com ainda mais sensibilidade, reconhecendo as crianças como sujeitos potentes, curiosos, criativos e capazes de construir conhecimentos a partir de suas próprias perguntas e descobertas.",
      },
      {
        type: "paragraph",
        text: "A programação incluiu visitas, estudos, diálogos e momentos de troca com profissionais que atuam diretamente na construção da cultura educativa de Reggio Emilia. Foram dias intensos de aprendizagem, em que teoria e prática se encontraram para ampliar reflexões sobre o papel da escola na formação humana.",
      },
      {
        type: "heading",
        text: "Novos olhares para a Terra Terrinha",
      },
      {
        type: "paragraph",
        text: "Para a Terra Terrinha, participar desse movimento internacional de estudo e pesquisa significa fortalecer um compromisso que faz parte da nossa essência: construir uma educação que respeita os tempos da infância, valoriza as múltiplas linguagens das crianças e transforma a aprendizagem em uma experiência viva, significativa e conectada com o mundo.",
      },
      {
        type: "paragraph",
        text: "Ao retornar dessa experiência, Ana Cláudia e Susy trazem novos olhares, reflexões e inspirações que dialogam diretamente com o trabalho desenvolvido diariamente em nossa escola. Mais do que respostas prontas, trazem perguntas, possibilidades e a certeza de que a educação se fortalece quando permanece aberta à investigação, à escuta e à construção coletiva.",
      },
      {
        type: "paragraph",
        text: "Seguimos acreditando que educar é um processo contínuo de aprendizagem. E que, quando ampliamos nossos horizontes, fortalecemos ainda mais a nossa capacidade de oferecer às crianças experiências educativas profundas, respeitosas e verdadeiramente transformadoras.",
      },
    ],
  },
  {
    id: "dia-das-maes",
    slug: "dia-das-maes-a-memoria-que-cada-crianca-escolheu-guardar",
    title: "Dia das Mães: a memória que cada criança escolheu guardar",
    excerpt:
      "Na Terra Terrinha, o Dia das Mães foi celebrado com um encontro cheio de afeto, preparado ao longo de uma semana especial em que as crianças criaram lembranças únicas e significativas ao lado de suas mães.",
    date: "Maio de 2026",
    categoria: "Eventos",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/dia-das-maes/Dia%20das%20M%C3%A3es.jpg",
    content: [
      {
        type: "heading",
        text: "Dia das Mães: a memória que cada criança escolheu guardar",
      },
      {
        type: "paragraph",
        text: "Há celebrações que começam no dia marcado no calendário. E há aquelas que começam muito antes, nos detalhes, na intenção, no carinho depositado em cada etapa da preparação. O Dia das Mães na Terra Terrinha foi, sem dúvida, do segundo tipo.",
      },
      {
        type: "paragraph",
        text: "A manhã reuniu mães e famílias da Educação Infantil e do Ensino Fundamental em torno de um café preparado com cuidado para receber cada uma delas. Mas o que tornou o encontro verdadeiramente especial havia sido construído ao longo de toda a semana anterior.",
      },
      {
        type: "heading",
        text: "Uma semana de preparação com intenção",
      },
      {
        type: "paragraph",
        text: "Durante os dias que antecederam a celebração, as crianças viveram momentos cheios de sensibilidade e significado. Confeccionaram os próprios porta-retratos, criaram cartões e participaram de um registro muito especial: cada criança escolheu, dentro da escola, um lugar que ama. Um cantinho onde brinca, descobre, vive suas experiências. E foi exatamente nesse espaço, tão particular e tão seu, que as fotos foram feitas ao lado das mães.",
      },
      {
        type: "paragraph",
        text: "O resultado foi algo que nenhuma loja poderia oferecer: uma memória construída pela própria criança, com afeto, dedicação e significado em cada detalhe.",
      },
      {
        type: "image",
        url: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/dia-das-maes/DiadasM%C3%A3es.jpg",
        alt: "Dia das Mães",
      },
      {
        type: "heading",
        text: "Mais do que um presente, uma lembrança",
      },
      {
        type: "paragraph",
        text: "É nessa escolha que mora a beleza da proposta. Ao convidar cada criança a identificar o seu lugar favorito na escola, a Terra Terrinha transformou um espaço cotidiano em algo eterno. Aquele canto de brincadeira, aquela janela, aquele canteiro, ganhou um novo significado: o de cenário de uma lembrança que ficará guardada no coração de mães e filhos para sempre.",
      },
      {
        type: "paragraph",
        text: "Foi uma manhã de encontros, abraços e emoções.",
      },
      {
        type: "paragraph",
        text: "Do tipo que a gente não esquece.",
      },
    ],
  },
  {
    id: "ingles-na-infancia",
    slug: "ingles-na-infancia-a-janela-que-se-abre-antes-mesmo-de-voce-perceber",
    title: "Inglês na infância: a janela que se abre antes mesmo de você perceber",
    excerpt:
      "Nos primeiros anos de vida, a alta plasticidade cerebral cria condições únicas para a aquisição de um novo idioma. Na Terra Terrinha, o inglês é vivido de forma natural, contextualizada e integrada à rotina das crianças.",
    date: "Abril de 2026",
    categoria: "Educação",
    imagem: "https://k4lk5awaf7aaancs.public.blob.vercel-storage.com/blogs/ingles-na-infancia/Ingl%C3%AAs.jpg",
    content: [
      {
        type: "heading",
        text: "Inglês na infância: a janela que se abre antes mesmo de você perceber",
      },
      {
        type: "paragraph",
        text: "Será que é cedo demais para apresentar um novo idioma a uma criança pequena? Para Celso Gusman, Coordenador de Inglês da Escola Terra Terrinha, a pergunta deveria ser outra: será que estamos esperando tempo demais?",
      },
      {
        type: "paragraph",
        text: "O ponto de partida está na biologia. Nos primeiros anos de vida, o cérebro infantil opera em estado de alta plasticidade, criando condições únicas para a aquisição de linguagem.",
      },
      {
        type: "paragraph",
        text: "\"Começar o inglês na infância não é só mais fácil, é mais orgânico. A criança não estuda a língua, ela absorve padrões\", explica Celso. É o mesmo processo pelo qual ela aprendeu o português, não como matéria, mas como experiência vivida. Sem medo de errar. Com disponibilidade plena para mergulhar.",
      },
      {
        type: "heading",
        text: "Mais importante do que a idade é a forma",
      },
      {
        type: "paragraph",
        text: "Celso é direto: quanto antes, melhor. Mas acompanha essa afirmação de um alerta. \"Para não queimar a largada, precisamos não cair no maior erro do mercado: antecipar conteúdo sem adaptar metodologia. Mais importante do que a idade é a forma como esse contato acontece.\"",
      },
      {
        type: "paragraph",
        text: "A criança não aprende como um adulto. Enquanto adultos buscam a lógica do idioma, ela aprende pelo contexto, pelos jogos com intenção e pela repetição que faz sentido dentro do que está vivendo.",
      },
      {
        type: "paragraph",
        text: "\"As crianças querem perceber o valor daquilo que aprendem enquanto vivenciam a aprendizagem. De preferência se divertindo\", diz Celso.",
      },
      {
        type: "heading",
        text: "Os benefícios vão além do idioma",
      },
      {
        type: "paragraph",
        text: "Aprender inglês na infância desenvolve flexibilidade mental, aprofunda até o entendimento do próprio português e amplia o repertório cultural e afetivo da criança.",
      },
      {
        type: "paragraph",
        text: "Há ainda a dimensão prática: num país em que apenas 5% da população fala inglês com fluência, esse diferencial abre portas que a maioria das pessoas nunca alcança.",
      },
      {
        type: "heading",
        text: "Como o inglês é vivido na Terra Terrinha",
      },
      {
        type: "paragraph",
        text: "Na Terra Terrinha, o contato começa no Maternal 1, integrado à rotina desde o primeiro dia. Até os 4 anos, sem material didático: o idioma vive nas brincadeiras, nas interações e nos momentos de investigação.",
      },
      {
        type: "paragraph",
        text: "A partir daí, materiais com trajetória de aprendizagem entram em cena, mas a filosofia não muda. No Ensino Fundamental I, os materiais se alinham à BNCC e ao CEFR, mas ocupam apenas entre 30% e 40% do tempo. O restante acontece em projetos, produções e situações reais de comunicação.",
      },
      {
        type: "paragraph",
        text: "\"Priorizamos a linguagem em contexto real, com foco na comunicação, e não na memorização\", resume Celso.",
      },
      {
        type: "heading",
        text: "O papel da família",
      },
      {
        type: "paragraph",
        text: "Em casa, não se trata de ensinar inglês nem cobrar desempenho. O que faz diferença é o contato leve e natural com o idioma, por meio de músicas, filmes e jogos.",
      },
      {
        type: "paragraph",
        text: "\"O papel da família não é ensinar inglês, mas ajudar a criança a gostar do contato com a língua. No fim, a alegria é um fator determinante para o sucesso desse processo\", conclui Celso.",
      },
      {
        type: "paragraph",
        text: "Na Terra Terrinha, o inglês não é uma disciplina a mais. É parte do cotidiano, das brincadeiras e das descobertas. E é aí que mora a diferença entre saber inglês e crescer com ele.",
      },
    ],
  },
  {
    id: "conexao-natureza",
    slug: "conexao-com-a-natureza-um-diferencial-pedagogico",
    title: "Conexão com a natureza: um diferencial pedagógico",
    excerpt:
      "Na Escola Terra Terrinha, a natureza não é apenas cenário: ela é parte viva do cotidiano, um território de descobertas, encantamento e aprendizado que amplia os sentidos e favorece um desenvolvimento mais completo, integral e humano.",
    date: "Março de 2026",
    categoria: "Pedagogia",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conexao-com-a-natureza-um-diferencial-pedagogico-mIrU9WekGLDpcvfVMj2Qnx6pBywmeG.jpg",
    content: [
      {
        type: "paragraph",
        text: "Na Escola Terra Terrinha, a natureza não é apenas cenário: ela é parte viva do cotidiano, um território de descobertas, encantamento e aprendizado. Desde os primeiros anos da infância, o contato com o mundo natural amplia os sentidos, desperta curiosidade e favorece um desenvolvimento mais completo, integral e humano.",
      },
      {
        type: "paragraph",
        text: "Quando a criança explora a grama com os pés, observa insetos, sente o cheiro das plantas, experimenta diferentes texturas e brinca ao ar livre, ela está aprendendo com o corpo todo. Cada experiência sensorial ajuda a construir repertório, desenvolver autonomia e fortalecer vínculos afetivos com o ambiente. A natureza se torna uma espécie de laboratório aberto, onde tudo convida à investigação.",
      },
      {
        type: "paragraph",
        text: "Estudos mostram que crianças que convivem diariamente com ambientes naturais apresentam maior capacidade de concentração, criatividade, segurança emocional e habilidade para resolver problemas. Isso acontece porque a natureza oferece estímulos genuínos, variados e imprevisíveis, elementos que favorecem o pensamento crítico e a construção do conhecimento.",
      },
      {
        type: "paragraph",
        text: "No brincar ao ar livre, elas desenvolvem coordenação, equilíbrio, coragem e imaginação. Nas interações com o espaço, aprendem sobre ciclos, diversidade, cuidado e responsabilidade. Em situações coletivas, descobrem formas de cooperar, dividir, organizar e criar juntos. A natureza ensina, inspira e transforma.",
      },
      {
        type: "heading",
        text: "O ambiente como terceiro educador",
      },
      {
        type: "paragraph",
        text: "Na Terra Terrinha, essa relação é intencional. Acreditamos que o ambiente é o terceiro educador, ao lado do professor e dos colegas. Por isso, nossos espaços são planejados para integrar o verde ao cotidiano escolar: jardins, árvores, sombras, áreas sensoriais e ambientes externos que acolhem brincadeiras, projetos e experiências de convivência.",
      },
      {
        type: "paragraph",
        text: "Mais do que benefícios pedagógicos, o contato com a natureza desde cedo desenvolve um senso de pertencimento ao mundo. Ensina a criança a respeitar, cuidar e se responsabilizar pelo planeta, construindo uma consciência ambiental que fará diferença ao longo de toda a vida.",
      },
      {
        type: "paragraph",
        text: "Crescer em contato com a natureza é crescer com liberdade, curiosidade e encantamento. E é por isso que, na Terra Terrinha, ela é parte essencial daquilo que somos e da educação que acreditamos.",
      },
    ],
  },
  {
    id: "educacao-construtivista",
    slug: "educacao-construtivista-nossa-metodologia-na-pratica",
    title: "Educação construtivista: nossa metodologia na prática",
    excerpt:
      "Na Terra Terrinha, acreditamos que a criança é protagonista do próprio processo de aprendizagem. É ela quem investiga, formula hipóteses, testa caminhos, observa, erra, recomeça e descobre. Essa é a essência do construtivismo: aprender fazendo.",
    date: "Fevereiro de 2026",
    categoria: "Pedagogia",
    imagem:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/educacao-construtivista-nossa-metodologia-na-pratica-MmisJxqV9uweaZbavoKi5cq8CzT06R.jpg",
    content: [
      {
        type: "paragraph",
        text: "Na Terra Terrinha, acreditamos que a criança é protagonista do próprio processo de aprendizagem. É ela quem investiga, formula hipóteses, testa caminhos, observa, erra, recomeça, descobre… E é justamente nesse movimento vivo que o aprendizado se consolida. Essa é a essência da educação construtivista: aprender fazendo, em um ambiente que acolhe, provoca e possibilita novas experiências todos os dias.",
      },
      {
        type: "paragraph",
        text: "Mais do que transmitir conteúdos, o construtivismo propõe que a escola ofereça situações reais para que a criança pense, questione e construa conhecimento de forma significativa. Quando ela participa ativamente, quando manipula objetos, quando conversa com os colegas, quando se relaciona com o ambiente, ela compreende o mundo de forma profunda e duradoura.",
      },
      {
        type: "paragraph",
        text: "Na prática, isso acontece de maneiras simples e poderosas: na roda de conversa que estimula a escuta e a argumentação; na atividade de investigação que desperta a curiosidade; nas propostas artísticas que ampliam a expressão; nas brincadeiras ao ar livre que conectam corpo, natureza e criatividade; nos projetos coletivos que convidam à cooperação e ao pensamento crítico.",
      },
      {
        type: "heading",
        text: "O erro como parte do aprendizado",
      },
      {
        type: "paragraph",
        text: "O erro, nessa perspectiva, não é uma falha. É parte fundamental do processo. Ele mostra caminhos, gera perguntas e abre espaço para novas tentativas. É assim que a criança aprende a resolver problemas, a desenvolver autonomia e a fortalecer sua confiança.",
      },
      {
        type: "paragraph",
        text: "Ao vivenciar experiências concretas, relacioná-las ao seu repertório e compartilhá-las com o grupo, ela constrói não apenas conhecimento acadêmico, mas também social, emocional e humano. Aprende a respeitar o outro, a fazer escolhas, a argumentar, a criar, a se expressar.",
      },
      {
        type: "paragraph",
        text: "Aqui na Terra Terrinha, o construtivismo é vivido no cotidiano, de forma sensível, intencional e integrada. Porque educar não é apenas ensinar conteúdos, é formar pessoas curiosas, críticas, criativas e preparadas para os desafios do mundo. E isso se faz com uma infância verdadeira, ambiente acolhedor e um aprendizado que nasce da experiência e do encantamento.",
      },
    ],
  },
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
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug || p.id === slug)
}
