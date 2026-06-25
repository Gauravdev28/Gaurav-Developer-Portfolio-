import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

// Define the 3D spline path winding through space
const splinePoints = [
  new THREE.Vector3(0, 1.2, 10),
  new THREE.Vector3(-1.8, 0.4, 4),
  new THREE.Vector3(1.8, -0.6, -2),
  new THREE.Vector3(-0.8, 0.8, -8),
  new THREE.Vector3(0.8, -0.2, -14),
  new THREE.Vector3(0, 0.2, -20),
];

const curve = new THREE.CatmullRomCurve3(splinePoints);

/**
 * Builds a curved neural-network lattice that hugs the 3D spline curve.
 * This forms the visual cyber-web tunnel that the camera travels through.
 */
function buildNetwork() {
  const segments = 32;
  const nodesPerRing = 8;
  const radius = 1.6;
  const frames = curve.computeFrenetFrames(segments, false);
  const nodes: THREE.Vector3[] = [];
  const rings: THREE.Vector3[][] = [];

  for (let i = 0; i <= segments; i++) {
    const ring: THREE.Vector3[] = [];
    const p = curve.getPointAt(i / segments);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];

    for (let j = 0; j < nodesPerRing; j++) {
      const angle = (j / nodesPerRing) * Math.PI * 2;
      // Add subtle noise/wave to make the web feel organic
      const wave = Math.sin(angle * 3 + i * 0.4) * 0.15;
      const r = radius + wave;
      
      const x = p.x + normal.x * Math.cos(angle) * r + binormal.x * Math.sin(angle) * r;
      const y = p.y + normal.y * Math.cos(angle) * r + binormal.y * Math.sin(angle) * r;
      const z = p.z + normal.z * Math.cos(angle) * r + binormal.z * Math.sin(angle) * r;
      const v = new THREE.Vector3(x, y, z);
      
      ring.push(v);
      nodes.push(v);
    }
    rings.push(ring);
  }

  const edges: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
  for (let i = 0; i <= segments; i++) {
    const ring = rings[i];
    // Connect nodes around the ring
    for (let j = 0; j < nodesPerRing; j++) {
      edges.push({ a: ring[j], b: ring[(j + 1) % nodesPerRing] });
    }
    // Connect nodes to the next ring
    if (i < segments) {
      const nextRing = rings[i + 1];
      for (let j = 0; j < nodesPerRing; j++) {
        edges.push({ a: ring[j], b: nextRing[j] });
        // Add random diagonal cross-connections to make it look like a web mesh
        if (Math.random() > 0.45) {
          edges.push({ a: ring[j], b: nextRing[(j + 2) % nodesPerRing] });
        }
      }
    }
  }

  return { nodes, edges };
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const { nodes, edges } = useMemo(buildNetwork, []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      arr[i * 6] = e.a.x;
      arr[i * 6 + 1] = e.a.y;
      arr[i * 6 + 2] = e.a.z;
      arr[i * 6 + 3] = e.b.x;
      arr[i * 6 + 4] = e.b.y;
      arr[i * 6 + 5] = e.b.z;
    });
    return arr;
  }, [edges]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x;
      arr[i * 3 + 1] = n.y;
      arr[i * 3 + 2] = n.z;
    });
    return arr;
  }, [nodes]);

  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.size = 0.08 + Math.sin(t * 1.5) * 0.01;
      mat.opacity = 0.75 + Math.sin(t * 1.2) * 0.15;
    }
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.18 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group ref={group} name="network-group">
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ccfbf1"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Renders a particle system where particles stretch into motion blur lines (warp streaks)
 * during fast scroll interactions.
 */
function Pulses({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.LineSegments>(null);

  // Define start/end pairs for each line segment representing particles
  const { positions, baseCoords } = useMemo(() => {
    const posArr = new Float32Array(count * 6);
    const base = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 20 - 10; // spread from -20 to 10
      
      base.push({ x, y, z });

      // Start vertex
      posArr[i * 6] = x;
      posArr[i * 6 + 1] = y;
      posArr[i * 6 + 2] = z;
      // End vertex
      posArr[i * 6 + 3] = x;
      posArr[i * 6 + 4] = y;
      posArr[i * 6 + 5] = z - 0.05;
    }
    return { positions: posArr, baseCoords: base };
  }, [count]);

  const scrollRef = useRef({ lastY: 0, velocity: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    scrollRef.current.lastY = window.scrollY;
    
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - scrollRef.current.lastY);
      scrollRef.current.velocity = Math.min(scrollRef.current.velocity + diff * 0.04, 3.5);
      scrollRef.current.lastY = currentY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Decay the scroll speed velocity back to zero
    scrollRef.current.velocity += (0 - scrollRef.current.velocity) * 0.08;
    const velocity = scrollRef.current.velocity;
    const speed = 0.5 + velocity * 4.5;
    const warpLength = 0.05 + velocity * 0.8;

    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      const base = baseCoords[i];
      base.z += speed * delta * 8;

      // Wrap around once past the camera threshold
      if (base.z > 12) {
        base.z = -18;
        base.x = (Math.random() - 0.5) * 16;
        base.y = (Math.random() - 0.5) * 10;
      }

      // Update start vertex
      posAttr.setX(i * 2, base.x);
      posAttr.setY(i * 2, base.y);
      posAttr.setZ(i * 2, base.z);

      // Update end vertex (stretched backward relative to motion direction)
      posAttr.setX(i * 2 + 1, base.x);
      posAttr.setY(i * 2 + 1, base.y);
      posAttr.setZ(i * 2 + 1, base.z - warpLength);
    }
    posAttr.needsUpdate = true;

    if (ref.current.material) {
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + (velocity / 3.5) * 0.55;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#a7f3d0"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

/**
 * Controls camera positioning on the spline curve and adds organic pointer parallax.
 */
function SceneController() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const smoothedScroll = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        scrollRef.current = window.scrollY / totalHeight;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Smooth the raw scroll progress
    smoothedScroll.current += (scrollRef.current - smoothedScroll.current) * 0.07;
    const progress = smoothedScroll.current;

    // Get camera coordinate along the curve
    const camPos = curve.getPointAt(progress);
    
    // Look slightly ahead on the curve (clamp at end)
    const lookTarget = curve.getPointAt(Math.min(progress + 0.05, 1));

    // Pointer-driven interactive parallax (steering feel)
    const offsetCamX = state.pointer.x * 0.45;
    const offsetCamY = state.pointer.y * 0.35;

    camera.position.copy(camPos).add(new THREE.Vector3(offsetCamX, offsetCamY, 0));
    camera.lookAt(lookTarget);
  });

  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 4, 4]} intensity={1.3} color="#10b981" />
        <pointLight position={[-4, -2, 3]} intensity={0.9} color="#a3e635" />
        <Pulses />
        <Network />
        <SceneController />
      </Suspense>
    </Canvas>
  );
}
