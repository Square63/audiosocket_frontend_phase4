import Image from 'next/image';
import jenn from '../images/jenn.jpg';
import sarah from '../images/sarah.jpeg';
import bryan from '../images/bryan.jpg';
import shauna from '../images/shauna.jpg';
import sophie from '../images/sophie.jpeg';
import JM from '../images/JM.jpg';
import emilia from '../images/Emilia.jpeg';
import vanessa from '../images/vanessa.jpg';
import lindsey from '../images/lindsey.jpeg';
import duddy from '../images/duddy.jpeg';
import jim from '../images/jim.jpeg';
import josh from '../images/josh.jpeg';
import craig from '../images/craig.jpeg';

function about() {
  return (
    <div className="aboutUs">
      <div className="fixed-container">
        <div className="aboutUsHead">
          <h1>About Us</h1>
          <p>Audiosocket makes finding and licensing great music simple. We are a collective of musicians and creative professionals who work in partnership with our clients to deliver on their vision while helping artists monetize their work.. Our soulful, energetic, and committed team understands the critical role music plays in bringing media to life.</p>

          <p>With in-house music supervisors and composers available, Audiosocket has the resources to cover any need your project calls for, whether it’s a snippet of a song or a full soundtrack. That’s how we established a reputation in the industry for exceptional music, outstanding service, and solid execution.</p>
        </div>
        <div className="staffWrapper">
          <div className="staffItem">
            <div className="staffImg">
              <Image src={jenn} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Jenn Anderson-Miller</p>
              <p className="designation">CEO 	&amp; Co-Founder</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={sarah} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Sarah Hunt</p>
              <p className="designation">VP Music &amp; Operations</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={bryan} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Bryan Osuszek</p>
              <p className="designation">VP, Marketing</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={shauna} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Shauna Heckathorn</p>
              <p className="designation">Controller</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={JM} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Justin Marcellus</p>
              <p className="designation">Head of Classification</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={sophie} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Sophie Ashdown Coady</p>
              <p className="designation">Project Management</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={emilia} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Emilia Ellington</p>
              <p className="designation">Accounting</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={vanessa} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Vanessa Rogeiro</p>
              <p className="designation">Music Licensing Coordinator</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={lindsey} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Lindsey Znosko</p>
              <p className="designation">Creative &amp; Sync Licensing</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={duddy} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Duddy</p>
              <p className="designation">Lead Producer Pop,<br/> The RED Collective</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={jim} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Jim Hustwit</p>
              <p className="designation">Lead Producer Orchestral, The RED Collective</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={josh} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Josh Collopy</p>
              <p className="designation">Producer, <br/>The Red Collective. <br/>
              Music Licensing Sales</p>
            </div>
          </div>

          <div className="staffItem">
            <div className="staffImg">
              <Image src={craig} alt="About Us" className="staffItemImg"></Image>
            </div>
            <div className="staffBio">
              <p className="name">Craig Thorpe</p>
              <p className="designation">Clearance &amp; Catalog</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default about;
