import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fragmentShader = `
    uniform vec2 u_resolution;
    uniform vec3 u_color; //random:true
    uniform bool u_color_random; //ignore:true
    uniform float u_size; //units:px, min:1, max: 256, step:1
    uniform float u_vignette; //units:%, step:0.001
    uniform float u_amount; //units:%
    uniform bool u_opacity_random; //ignore:true
    uniform float u_rotation; //units:°, min:0, max:360, step:1, random:true
    uniform bool u_rotation_random; //ignore:true
    uniform bool u_shape[7];
    uniform sampler2D u_shape_image;
    uniform vec2 u_shape_image_resolution; //ignore:true
    uniform float u_random_seed; //ignore:true
    uniform float u_aa_passes; //ignore:true
    uniform float u_time; // Added for potential time-based effects
    uniform vec2 u_mouse; // Added for potential mouse-based effects

    float vignette(float amount){
          vec2 position = (gl_FragCoord.xy / u_resolution) - vec2(0.5);
          float dist = length(position * vec2(u_resolution.x/u_resolution.y, 1.0));
          float radius = 1.0*amount;
          float softness = 1.0-radius;
          float v = smoothstep(radius, radius - softness, dist);
          return v;
      }

    float aspectScale(inout vec2 st,float xRes, float yRes){
        float aspect = xRes/yRes;
        float diff = (1.0 - aspect)/2.0;
        float vis = 1.0;

        if(aspect > 1.){
        st.y *= aspect;
        st.y += diff;
        vis = (1.0 - step(1.0,st.y)) * (step(0.0,st.y)) * (1.0 - step(1.0,st.x)) * (step(0.0,st.x));
        } else {
            st.x *= yRes/xRes;
            st.x += (1.0 - yRes/xRes)/2.0;
            vis = (1.0 - step(1.0,st.x)) *(step(0.0,st.x)) * (1.0 - step(1.0,st.y)) *(step(0.0,st.y));
        }
        return vis;
    }

    highp float rand(vec2 co)
    {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt= dot(co.xy ,vec2(a,b));
        highp float sn= mod(dt,3.14);
        return fract(sin(sn) * c);
    }

    #ifndef PI
    #define PI 3.1415926535897932384626433832795
    #endif

    vec3 hash3D(vec2 x)
    {
        uvec3 v = uvec3(x.xyx * 65536.0) * 1664525u + 1013904223u;
        v += v.yzx * v.zxy;
        v ^= v >> 16u;
        v.x += v.y * v.z;
        v.y += v.z * v.x;
        v.z += v.x * v.y;
        return vec3(v) * (1.0 / float(0xffffffffu));
    }

    void staticNoise(vec3 color, float scale, float distribution, float rotation, bool random_opacity, bool random_rotation, bool multicolor){
        vec2 st = gl_FragCoord.xy / u_resolution.x;
        st *= u_resolution / scale; // Scale the coordinate system

        vec2 ipos = floor(st);  // get the integer coords
        vec2 fpos = fract(st);  // get the fractional coords
        st = fpos;

        if (random_rotation == true) {
            rotation = rand(ipos) * 360.;
        }

        float opacity = 1.0;
        if (random_opacity == true) {
            opacity = rand(ipos * u_random_seed);
        }

        float amt = hash3D(hash3D(ipos).xy).x;

        vec2 center = vec2(u_resolution / scale*0.5 - 0.5);
        float dist = distance(ipos,center);
        float v = (1.0 - (dist/center.x*(u_vignette)));
        opacity *= pow(v,20.);

        if (u_color_random == true){
            color = hash3D(ipos);
        }

        float shape = 1.;

        if(u_shape[0]){ // square
             gl_FragColor = vec4(vec3(color),step(1.0 - distribution,amt) * opacity);
        } else if(u_shape[1]){ // circle
             gl_FragColor = vec4(vec3(color),step(1.0 - distribution,amt) * opacity); // Placeholder
        }
        else {
             gl_FragColor = vec4(vec3(color),step(1.0 - distribution,amt) * opacity);
        }
    }

    void main() {
        staticNoise(u_color, u_size, u_amount, u_rotation, u_opacity_random, u_rotation_random, u_color_random);

         vec2 position = (gl_FragCoord.xy / u_resolution) - vec2(0.5);
         float dist = length(position);
         float vig = smoothstep(0.5, 0.2, dist); // Example vignette values
         gl_FragColor.rgb *= vig; // Multiply color by vignette

         gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), 0.03); // Mix with black slightly

         gl_FragColor.a *= 0.2; // Match the 0.2 opacity
    }
`;

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const TextureMesh = ({ amount, size, vignette, colorRandom }) => {
  const mesh = useRef(null);
  const { size: canvasSize } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_resolution: {
        value: new THREE.Vector2(canvasSize.width, canvasSize.height),
      },
      u_size: { value: size },
      u_amount: { value: amount },
      u_vignette: { value: vignette },
      u_opacity_random: { value: true },
      u_random_seed: { value: Math.random() },
      u_shape: { value: [true, false, false, false, false, false, false] },
      u_shape_image: { value: null },
      u_shape_image_resolution: { value: new THREE.Vector2(0, 0) },
      u_rotation: { value: 0 },
      u_rotation_random: { value: false },
      u_color_random: { value: colorRandom },
      u_aa_passes: { value: 2 },
      u_color: { value: new THREE.Color(0.5, 0.5, 0.5) },
    }),
    [canvasSize.width, canvasSize.height]
  );

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_amount.value = amount;
    }
  }, [amount]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_size.value = size;
    }
  }, [size]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_vignette.value = vignette;
    }
  }, [vignette]);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.u_color_random.value = colorRandom;
      if (!colorRandom) {
        mesh.current.material.uniforms.u_color.value.setRGB(0.5, 0.5, 0.5);
      }
    }
  }, [colorRandom]);

  useFrame((state) => {
    const { clock, mouse, size: currentCanvasSize } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
      mesh.current.material.uniforms.u_mouse.value.set(
        mouse.x * 0.5 + 0.5,
        mouse.y * 0.5 + 0.5
      );
      if (
        mesh.current.material.uniforms.u_resolution.value.x !==
          currentCanvasSize.width ||
        mesh.current.material.uniforms.u_resolution.value.y !==
          currentCanvasSize.height
      ) {
        mesh.current.material.uniforms.u_resolution.value.set(
          currentCanvasSize.width,
          currentCanvasSize.height
        );
      }
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1} rotation={[0, 0, 0]}>
      <planeGeometry args={[canvasSize.width, canvasSize.height]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        glslVersion={THREE.GLSL1}
      />
    </mesh>
  );
};

const NoiseOverlay = ({ amount, size, vignette, colorRandom }) => {
  return (
    <div
      style={{
        position: "fixed", // Or 'absolute' if relative to a specific container
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10, // Overlay z-index
        pointerEvents: "none", // Make sure this is correctly applied
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 1000 }}
        gl={{
          preserveDrawingBuffer: true,
          premultipliedAlpha: false,
          alpha: true,
          antialias: false,
          precision: "lowp",
          powerPreference: "high-performance",
        }}
        dpr={window.devicePixelRatio}
        style={{ pointerEvents: "none" }}
      >
        <TextureMesh
          amount={amount}
          size={size}
          vignette={vignette}
          colorRandom={colorRandom}
        />
      </Canvas>
    </div>
  );
};

export default NoiseOverlay;
