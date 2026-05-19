export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY não configurada")
    return false
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  })

  const data = await res.json()
  // score >= 0.5 indica tráfego humano (0.0 = bot, 1.0 = humano)
  return data.success === true && data.score >= 0.5
}
