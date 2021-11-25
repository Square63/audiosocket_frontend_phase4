import dynamic from 'next/dynamic'

const AudioWave = dynamic(
  () => import('../components/AudioWave'),
  { ssr: false }
)
const CustomAudioWave = dynamic(
  () => import('../components/CustomAudioWave'),
  { ssr: false }
)

function Player() {
    return (
      <div>
        <AudioWave/>
        <CustomAudioWave/>
      </div>
    );
  }
  
  export default Player;