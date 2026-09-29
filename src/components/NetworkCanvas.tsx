import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

type Node = { x: number; y: number; vx: number; vy: number; r: number }
type Packet = { a: number; b: number; t: number; speed: number }

const LINK_DIST = 140
const CURSOR_DIST = 180

/**
 * A drifting network graph: nodes connect when close, packets travel along links,
 * and the cursor acts as a hub that lights up everything in range.
 * Pauses when off screen or in a background tab; draws one still frame for reduced motion.
 */
export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    const packets: Packet[] = []
    const cursor = { x: -9999, y: -9999 }
    let raf = 0
    let visible = true

    const color = () => getComputedStyle(document.documentElement).getPropertyValue('--net').trim() || '45, 212, 191'
    let rgb = color()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (width * height) / 14000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }))
      packets.length = 0
    }

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)
      if (animate) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${rgb}, ${0.18 * (1 - d / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            if (animate && packets.length < 14 && Math.random() < 0.0009) {
              packets.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.012 })
            }
          }
        }
        const dc = Math.hypot(a.x - cursor.x, a.y - cursor.y)
        if (dc < CURSOR_DIST) {
          ctx.strokeStyle = `rgba(${rgb}, ${0.55 * (1 - dc / CURSOR_DIST)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(cursor.x, cursor.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const near = Math.hypot(n.x - cursor.x, n.y - cursor.y) < CURSOR_DIST
        ctx.fillStyle = `rgba(${rgb}, ${near ? 0.95 : 0.55})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? n.r + 1 : n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k]
        const a = nodes[p.a]
        const b = nodes[p.b]
        if (!a || !b) {
          packets.splice(k, 1)
          continue
        }
        p.t += p.speed
        if (p.t >= 1) {
          packets.splice(k, 1)
          continue
        }
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        ctx.fillStyle = 'rgba(251, 191, 36, 0.95)'
        ctx.shadowColor = 'rgba(251, 191, 36, 0.8)'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (reduced) draw(false)
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      cursor.x = e.clientX - r.left
      cursor.y = e.clientY - r.top
      if (reduced) draw(false)
    }
    const onLeave = () => {
      cursor.x = cursor.y = -9999
    }
    const onVisibility = () => start()
    const themeObserver = new MutationObserver(() => {
      rgb = color()
      if (reduced) draw(false)
    })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })

    const ro = new ResizeObserver(() => {
      resize()
      start()
    })

    ro.observe(canvas)
    io.observe(canvas)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="net-canvas" aria-hidden="true" />
}
