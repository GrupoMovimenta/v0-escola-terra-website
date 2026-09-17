import Link from "next/link"

/**
 * Aviso exigido pelos termos do reCAPTCHA.
 *
 * O `globals.css` esconde o badge do reCAPTCHA (`.grecaptcha-badge`). Os
 * termos do Google permitem isso APENAS se a atribuição aparecer em texto no
 * formulário — sem uma das duas coisas, o uso está fora dos termos. O site
 * escondia o badge e não tinha o texto.
 */
export function AvisoRecaptcha() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      Este site é protegido pelo reCAPTCHA e se aplicam a{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        Política de Privacidade
      </a>{" "}
      e os{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        Termos de Serviço
      </a>{" "}
      do Google.
    </p>
  )
}

/**
 * Aviso de tratamento de dados pessoais (LGPD, art. 9º: informação clara sobre
 * a finalidade antes da coleta). Os formulários coletavam nome, e-mail,
 * telefone e currículo sem nenhuma menção à política de privacidade, que já
 * existia em /politica mas só era alcançável pelo rodapé.
 *
 * Não adiciona nenhum campo de dado novo — só torna visível o uso do que já
 * era coletado.
 */
export function AvisoLgpd({ finalidade }: { finalidade: string }) {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      Ao enviar, você concorda que a Escola Terra Terrinha trate os dados informados para {finalidade}. Saiba mais na
      nossa{" "}
      <Link href="/politica" className="underline underline-offset-2 hover:text-foreground">
        Política de Privacidade
      </Link>
      .
    </p>
  )
}

/**
 * Mensagem de erro do formulário. `role="alert"` faz o leitor de tela
 * anunciá-la assim que aparece — sem isso, quem não vê a tela submete o
 * formulário e não recebe retorno nenhum.
 */
export function ErroFormulario({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="text-sm font-medium text-destructive">
      {children}
    </p>
  )
}
