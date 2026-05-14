'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// Marble texture — generated on canvas so no external assets needed
// ─────────────────────────────────────────────────────────────────────────────
function buildMarbleTexture(size = 1024): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!

  // Warm gradient base
  const base = ctx.createLinearGradient(0, 0, size, size * 0.7)
  base.addColorStop(0,   '#f7f2ec')
  base.addColorStop(0.5, '#f3ede7')
  base.addColorStop(1,   '#ece7e0')
  ctx.fillStyle = base
  ctx.fillRect(0, 0, size, size)

  // Primary Bézier veins
  for (let i = 0; i < 28; i++) {
    const x0 = Math.random() * size, y0 = Math.random() * size
    const x1 = Math.random() * size, y1 = Math.random() * size
    const cx1 = (x0 + x1) / 2 + (Math.random() - 0.5) * size * 0.7
    const cy1 = (y0 + y1) / 2 + (Math.random() - 0.5) * size * 0.5
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(cx1, cy1, x1, y1)
    ctx.strokeStyle = `rgba(105,92,76,${0.05 + Math.random() * 0.13})`
    ctx.lineWidth = 0.4 + Math.random() * 2.2
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  // Fine micro-veins
  for (let i = 0; i < 70; i++) {
    const x0 = Math.random() * size, y0 = Math.random() * size
    const x1 = x0 + (Math.random() - 0.5) * size * 0.5
    const y1 = y0 + (Math.random() - 0.5) * size * 0.5
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(
      (x0 + x1) / 2 + (Math.random() - 0.5) * 80,
      (y0 + y1) / 2 + (Math.random() - 0.5) * 80,
      x1, y1
    )
    ctx.strokeStyle = `rgba(155,140,122,${0.02 + Math.random() * 0.07})`
    ctx.lineWidth = 0.15 + Math.random() * 0.6
    ctx.stroke()
  }

  // Warm/cool colour pockets
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const r = 50 + Math.random() * 140
    const g = ctx.createRadialGradient(x, y, 5, x, y, r)
    g.addColorStop(0, Math.random() > 0.45
      ? `rgba(225,210,185,${0.04 + Math.random() * 0.07})`
      : `rgba(185,192,205,${0.02 + Math.random() * 0.05})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }

  return new THREE.CanvasTexture(c)
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function StatueBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x0a0a0a, 1)
    renderer.toneMapping         = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.6
    renderer.shadowMap.enabled   = true
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap

    // ── Scene ────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.04)

    // ── Camera ───────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 120)
    camera.position.set(0, 0.8, 11.5) // pulled back — zooms in on reveal
    camera.lookAt(0, 2.2, 0)

    // ── Marble material ──────────────────────────────────────────
    const marbleMat = new THREE.MeshPhysicalMaterial({
      color:              new THREE.Color(0.97, 0.94, 0.90),
      roughness:          0.32,
      metalness:          0.0,
      clearcoat:          0.3,
      clearcoatRoughness: 0.25,
      reflectivity:       0.4,
      map:                buildMarbleTexture(),
      envMapIntensity:    0.5,
    })

    // ── Ground ───────────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.95, metalness: 0 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.5
    ground.receiveShadow = true
    scene.add(ground)

    // ── Ground light pool ────────────────────────────────────────
    const poolCvs = document.createElement('canvas')
    poolCvs.width = poolCvs.height = 256
    const pc = poolCvs.getContext('2d')!
    const pg = pc.createRadialGradient(128, 128, 0, 128, 128, 128)
    pg.addColorStop(0,    'rgba(255,245,215,0.28)')
    pg.addColorStop(0.45, 'rgba(255,240,200,0.09)')
    pg.addColorStop(1,    'rgba(0,0,0,0)')
    pc.fillStyle = pg; pc.fillRect(0, 0, 256, 256)
    const pool = new THREE.Mesh(
      new THREE.CircleGeometry(3.0, 72),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(poolCvs),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    pool.rotation.x = -Math.PI / 2
    pool.position.y = -2.46
    scene.add(pool)

    // ── God ray ──────────────────────────────────────────────────
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xfff8e4,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const godRay = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 2.0, 11, 48, 1, true), rayMat)
    godRay.position.set(0.2, 6.2, 0)
    scene.add(godRay)

    // ── Lights — start at 0, animated in ────────────────────────
    const ambLight = new THREE.AmbientLight(0x18130e, 0)
    scene.add(ambLight)

    const keyLight = new THREE.DirectionalLight(0xfff5e8, 0)
    keyLight.position.set(-3.5, 9, 5)
    keyLight.castShadow           = true
    keyLight.shadow.mapSize.set(2048, 2048)
    keyLight.shadow.camera.near   = 0.5
    keyLight.shadow.camera.far    = 32
    keyLight.shadow.camera.left   = -7
    keyLight.shadow.camera.right  = 7
    keyLight.shadow.camera.top    = 9
    keyLight.shadow.camera.bottom = -5
    keyLight.shadow.bias          = -0.0008
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xa8c4ff, 0)
    fillLight.position.set(7, 2, -2)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0xff9050, 0, 22)
    rimLight.position.set(1, 6, -7)
    scene.add(rimLight)

    const topSpot = new THREE.SpotLight(0xffffff, 0, 28, Math.PI / 7, 0.35, 1.8)
    topSpot.position.set(0.3, 13, 0.5)
    topSpot.target.position.set(0, 1.5, 0)
    scene.add(topSpot, topSpot.target)

    const TARGETS = { amb: 3.0, key: 6.0, fill: 1.3, rim: 3.0, top: 3.5 }

    // ── Dust particles ───────────────────────────────────────────
    const spCvs = document.createElement('canvas')
    spCvs.width = spCvs.height = 64
    const sc = spCvs.getContext('2d')!
    const sg = sc.createRadialGradient(32, 32, 0, 32, 32, 32)
    sg.addColorStop(0,    'rgba(255,248,225,1)')
    sg.addColorStop(0.28, 'rgba(255,248,225,0.55)')
    sg.addColorStop(0.6,  'rgba(255,248,225,0.12)')
    sg.addColorStop(1,    'rgba(0,0,0,0)')
    sc.fillStyle = sg; sc.fillRect(0, 0, 64, 64)

    const DUST = 220
    const dustArr    = new Float32Array(DUST * 3)
    const dustSpeeds = new Float32Array(DUST)
    for (let i = 0; i < DUST; i++) {
      const t    = Math.random()
      const coneR = 0.15 + t * 2.0
      const ang  = Math.random() * Math.PI * 2
      dustArr[i*3]     = Math.cos(ang) * Math.random() * coneR
      dustArr[i*3 + 1] = -1.5 + t * 13.0
      dustArr[i*3 + 2] = Math.sin(ang) * Math.random() * coneR
      dustSpeeds[i]    = 0.002 + Math.random() * 0.004
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustArr, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.065, sizeAttenuation: true,
      map: new THREE.CanvasTexture(spCvs),
      transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, opacity: 0,
    })
    scene.add(new THREE.Points(dustGeo, dustMat))

    // ── Load statue model ────────────────────────────────────────
    let rafId = 0
    let revealing = false
    let revealPhase = 0
    let labelsRevealed = false

    const SOURCES = [
      'https://dl.polyhaven.org/file/ph-assets/Models/gltf/2k/marble_bust_01/marble_bust_01_2k.gltf',
      'https://raw.githubusercontent.com/playcanvas/engine/main/examples/assets/models/statue.glb',
    ]

    function applyModel(model: THREE.Group) {
      const box = new THREE.Box3().setFromObject(model)
      const sz  = new THREE.Vector3(); box.getSize(sz)
      const ctr = new THREE.Vector3(); box.getCenter(ctr)
      const s   = 5.2 / Math.max(sz.x, sz.y, sz.z)
      model.scale.setScalar(s)
      model.position.sub(ctr.multiplyScalar(s))
      model.position.y += sz.y * s * 0.5 - 2.1
      model.traverse(c => {
        if ((c as THREE.Mesh).isMesh) {
          const mesh = c as THREE.Mesh
          mesh.material    = marbleMat
          mesh.castShadow  = true
          mesh.receiveShadow = true
        }
      })
      scene.add(model)
      revealing = true
    }

    function buildFallbackBust() {
      const g   = new THREE.Group()
      const add = (geo: THREE.BufferGeometry, px: number, py: number, pz: number,
                   sx = 1, sy = 1, sz = 1) => {
        const m = new THREE.Mesh(geo, marbleMat)
        m.position.set(px, py, pz); m.scale.set(sx, sy, sz)
        m.castShadow = m.receiveShadow = true; g.add(m)
      }
      add(new THREE.BoxGeometry(2.2, 0.35, 2.2),             0, 0.18, 0)
      add(new THREE.CylinderGeometry(0.72, 0.82, 2.9, 12),   0, 1.82, 0)
      add(new THREE.BoxGeometry(1.75, 0.22, 1.75),            0, 3.30, 0)
      add(new THREE.CylinderGeometry(0.82, 0.52, 1.9, 32),   0, 4.32, 0)
      add(new THREE.CylinderGeometry(0.26, 0.36, 0.75, 32),  0, 5.56, 0)
      const hg = new THREE.SphereGeometry(0.63, 64, 64)
      hg.applyMatrix4(new THREE.Matrix4().makeScale(1, 1.15, 0.93))
      add(hg, 0, 6.34, 0)
      add(new THREE.SphereGeometry(0.07, 16, 16), -0.21, 6.50, 0.51, 1.9, 0.48, 1)
      add(new THREE.SphereGeometry(0.07, 16, 16),  0.21, 6.50, 0.51, 1.9, 0.48, 1)
      add(new THREE.CylinderGeometry(0.034, 0.056, 0.27, 12), 0, 6.22, 0.55)
      g.position.y = -3.95
      scene.add(g)
    }

    // Dynamic import so GLTFLoader doesn't run server-side
    import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
      const loader = new GLTFLoader()
      let idx = 0
      function tryNext() {
        if (idx >= SOURCES.length) { buildFallbackBust(); revealing = true; return }
        const src = SOURCES[idx++]
        loader.load(src, (gltf) => applyModel(gltf.scene), undefined, tryNext)
      }
      tryNext()
    }).catch(() => { buildFallbackBust(); revealing = true })

    // ── State ────────────────────────────────────────────────────
    let scroll = 0, tScroll = 0
    let mouseX = 0, mouseY  = 0
    let tMX = 0,   tMY     = 0

    const ORBIT_R     = 7.2
    const CAM_Y_START = 0.8
    const CAM_Y_END   = -0.1
    const LOOK_Y      = new THREE.Vector3(0, 2.2, 0)
    let camX = 0, camY = CAM_Y_START, camZ = 11.5
    let tCX  = 0, tCY  = CAM_Y_START, tCZ  = 11.5

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      tScroll   = max > 0 ? window.scrollY / max : 0

      // Canvas opacity: 1.0 → 0 over first 25% of page scroll
      const fade = Math.max(0, 1 - (tScroll / 0.25))
      if (canvas) canvas.style.opacity = String(fade)
    }
    const onMouse  = (e: MouseEvent) => {
      tMX = (e.clientX / window.innerWidth  - 0.5) * 2
      tMY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', onResize)

    // ── Animation loop ───────────────────────────────────────────
    const clock = new THREE.Clock()

    function animate() {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Lerp input
      scroll += (tScroll - scroll) * 0.042
      mouseX += (tMX - mouseX)     * 0.055
      mouseY += (tMY - mouseY)     * 0.055

      const e = scroll < 0.5
        ? 2 * scroll * scroll
        : 1 - Math.pow(-2 * scroll + 2, 2) / 2

      // ── Light reveal ─────────────────────────────────────────
      if (revealing) {
        revealPhase += (1 - revealPhase) * 0.009

        ambLight.intensity  = revealPhase * TARGETS.amb
        keyLight.intensity  = revealPhase * TARGETS.key
        fillLight.intensity = revealPhase * TARGETS.fill
        rimLight.intensity  = revealPhase * TARGETS.rim
        topSpot.intensity   = revealPhase * TARGETS.top
        dustMat.opacity     = revealPhase * 0.6
        rayMat.opacity      = revealPhase * 0.052

        if (revealPhase > 0.99 && !labelsRevealed) {
          labelsRevealed = true
          revealing = false
        }
      }

      // ── Camera orbit ─────────────────────────────────────────
      const angle  = e * Math.PI * 1.167
      const zoomR  = revealing
        ? ORBIT_R + (1 - Math.min(1, revealPhase * 1.4)) * 4
        : ORBIT_R

      tCX = Math.sin(angle) * zoomR + mouseX * 0.28
      tCZ = Math.cos(angle) * zoomR
      tCY = CAM_Y_START + e * (CAM_Y_END - CAM_Y_START) + mouseY * -0.22

      const sm = revealing ? 0.02 : 0.05
      camX += (tCX - camX) * sm
      camY += (tCY - camY) * sm
      camZ += (tCZ - camZ) * sm

      // Breathing
      camera.position.set(
        camX + Math.sin(t * 0.33) * 0.018,
        camY + Math.sin(t * 0.47) * 0.012,
        camZ
      )
      camera.lookAt(LOOK_Y.x, 2.2 + e * (1.4 - 2.2), LOOK_Y.z)

      // ── Rim light drift ───────────────────────────────────────
      rimLight.position.x  = 1.0 + Math.sin(t * 0.28) * 0.9
      rimLight.position.z  = -7.0 + Math.cos(t * 0.19) * 0.7
      if (!revealing)
        rimLight.intensity = TARGETS.rim * (0.88 + Math.sin(t * 0.6) * 0.12)

      // ── God ray + pool pulse ──────────────────────────────────
      if (!revealing) {
        rayMat.opacity  = 0.048 + Math.sin(t * 1.3) * 0.008
        ;(pool.material as THREE.MeshBasicMaterial).opacity =
          0.72 + Math.sin(t * 0.55) * 0.1
      }

      // ── Dust drift ────────────────────────────────────────────
      const dp = dustGeo.attributes.position.array as Float32Array
      for (let i = 0; i < DUST; i++) {
        dp[i*3 + 1] += dustSpeeds[i]
        if (dp[i*3 + 1] > 12) {
          const t2 = Math.random(), cR = 0.15 + t2 * 2.0
          const a2 = Math.random() * Math.PI * 2
          dp[i*3]     = Math.cos(a2) * Math.random() * cR
          dp[i*3 + 1] = -1.5
          dp[i*3 + 2] = Math.sin(a2) * Math.random() * cR
        }
      }
      dustGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      marbleMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
