import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uBgColor;
uniform vec3 uSilkColor;
uniform float uNoiseIntensity;
uniform float uScale;
varying vec2 vUv;

// --- Simplex Noise 3D ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.1;

  // Base domain scaling
  vec2 p = uv * uScale;
  
  // Layered noise for fluid fabric motion
  float n1 = snoise(vec3(p.x * 1.5, p.y * 1.5 - t, t * 0.5));
  float n2 = snoise(vec3(p.x * 2.0 + n1 * uNoiseIntensity, p.y * 2.0, t * 0.7));
  float n3 = snoise(vec3(p.x * 1.0 + n2 * uNoiseIntensity, p.y * 1.0 + n1, t * 0.3));

  // Creating the silk folds
  float fold = sin(n3 * 6.0 + t * 2.0);
  fold = fold * 0.5 + 0.5; // Map to [0, 1]
  
  // Lighting and contrast for silky appearance
  float softFold = smoothstep(0.1, 0.9, fold);
  float highlight = smoothstep(0.7, 1.0, fold) * 0.5; // Specular-like reflection
  
  // Premium blending
  vec3 color = mix(uBgColor, uSilkColor, softFold * 0.6 + highlight);

  // Add subtle cinematic grain overlay
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  color -= grain * 0.025;

  gl_FragColor = vec4(color, 1.0);
}
`;

interface SilkMeshProps {
  speed: number;
  scale: number;
  noiseIntensity: number;
  bgColor: string;
  silkColor: string;
}

const SilkMesh = ({ speed, scale, noiseIntensity, bgColor, silkColor }: SilkMeshProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBgColor: { value: new THREE.Color(bgColor) },
      uSilkColor: { value: new THREE.Color(silkColor) },
      uNoiseIntensity: { value: noiseIntensity },
      uScale: { value: scale },
    }),
    [bgColor, silkColor, noiseIntensity, scale]
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * speed * 0.1;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export interface HeroBackgroundProps {
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  bgColor?: string;
  silkColor?: string;
}

export default function HeroBackground({
  speed = 5.0,
  scale = 1.0,
  noiseIntensity = 1.5,
  bgColor = "#120f17",
  silkColor = "#7b7481",
}: HeroBackgroundProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#120f17]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <SilkMesh
          speed={reducedMotion ? 0 : speed}
          scale={scale}
          noiseIntensity={noiseIntensity}
          bgColor={bgColor}
          silkColor={silkColor}
        />
      </Canvas>
      {/* Optional edge darkening vignette for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120f17] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#120f17_100%)] opacity-40" />
    </div>
  );
}
