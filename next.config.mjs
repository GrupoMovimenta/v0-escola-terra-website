/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized:true faz o next/image não validar host nenhum hoje — os
    // remotePatterns abaixo documentam a origem permitida para quando a
    // otimização for religada.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/bucket-escola-terra-terrinha/**" },
      { protocol: "https", hostname: "k4lk5awaf7aaancs.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
    ],
  },
}

export default nextConfig
