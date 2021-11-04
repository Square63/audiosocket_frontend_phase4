import dynamic from 'next/dynamic'

const AudioWave = dynamic(
  () => import('../components/AudioWave'),
  { ssr: false }
)

function Player() {
    return (
      <AudioWave/>
    );
  }
  
  export default Player;