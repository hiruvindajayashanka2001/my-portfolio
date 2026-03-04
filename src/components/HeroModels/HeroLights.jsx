const HeroLights = () => {
  return (
    <>
      {/* Soft base ambient light */}
      <ambientLight intensity={0.2} />

      {/* Main room spotlight (softer than 100) */}
      <spotLight
        position={[2, 5, 6]}
        angle={0.3}
        penumbra={1}
        intensity={40}
        castShadow
      />

      {/* 💻 Monitor screen glow (cool developer blue) */}
      <pointLight
        position={[0, 2, 1]} // adjust after testing
        intensity={100}
        color="#3b82f6"
        distance={5}
      />

      {/* 🖥 Secondary screen subtle fill */}
      <pointLight
        position={[1, 2, 1]}
        intensity={15}
        color="#22d3ee"
        distance={4}
      />

      {/* 💡 Warm desk lamp glow */}
      <pointLight
        position={[-1, 3, 0]} // adjust to match lamp position
        intensity={50}
        color="#ffb703"
        distance={8}
        decay={2}
      />

      {/* ✨ Soft purple back glow (aesthetic touch) */}
      <pointLight
        position={[0, 3, -3]}
        intensity={10}
        color="#a855f7"
        distance={8}
      />
    </>
  )
}

export default HeroLights