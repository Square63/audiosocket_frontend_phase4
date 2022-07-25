import { useRouter } from 'next/router'

function LargeBusiness() {
  const router = useRouter();
  const planType = router.query.planType;

  return (
    <div className="generalContent">
      <div className="fixed-container">
        <a href="javascript:void(0)" className="backToHeaven backToSelectPlan">
          <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
            <g id="icon-arrow-down" transform="translate(15.414 1.414) rotate(90)">
              <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
          </svg>
          <span onClick={() => router.push(`/pricing?planType=${planType}`)}>{"Back to Plan"}</span>
        </a>
        <h1 className="gCHeading">Large Business License Agreement</h1>
        <p>This License Agreement (&quot;License&quot;) is made between the Person identified in the Audiosocket Storefront (&quot;Licensee&quot;) and Leopona, Inc.d/b/a Audiosocket (Audiosocket). By using the Licensed Tracks, Licensee accepts the terms of this License. If Licensee does not agree to the terms of this License, Licensee must not use the Licensed Tracks.</p>

        <h3 className="gCSubHeading">1. Definitions</h3>
        <h5>Sublicensees</h5>
        <p>Sublicensees means the Persons identified by Licensee in the Work Title during the License purchase process as Persons who may use, perform or distribute the Work.</p>
        <h5>Effective Date</h5>
        <p>Effective Date means the date Licensee licensed the Licensed Tracks in the Audiosocket Storefront.</p>
        <h5>License Fee</h5>
        <p>License Fee means the fees for Licensed Tracks identified in the Audiosocket storefront.</p>
        <h5>Licensed Tracks</h5>
        <p>Licensed Tracks means the tracks selected by Licensee during the License purchase process in the Audiosocket Storefront.</p>
        <h5>Person</h5>
        <p>Person means an individual, corporation, company, non-profit company, organization, or other entity.</p>
        <h5>Work</h5>
        <p>Work means the audiovisual work in which the Licensed Tracks will be used, as identified and described by Licensee in the Audiosocket Storefront during the License purchase process.</p>

        <h3 className="gCSubHeading">2. Licensed Tracks</h3>
        <h5>Licensed Tracks Title(s) and Information Number(s):</h5>

        <p>replace_with_licensed_item (Audiosocket Track # replace_with_licensed_item_id)</p>

        <h5>License Fee:</h5>

        <p>replace_with_license_price</p>

        <h3 className="gCSubHeading">3. Grant of License</h3>
        <p>Subject to the terms of this License and Licensee&apos;s payment of the applicable license fees, Licensor hereby grants to Licensee a perpetual (subject to Section 5), non-exclusive right and license within the Territory to use all or any part of the audio track(s), including the composition and master recording of the audio tracks, identified in Section 2 (each a &quot;<strong>Licensed Track</strong>&quot; and collectively, the &quot;<strong>Licensed Track</strong>&quot;) in Licensee&apos;s short form editorial videos, promotional videos, online games, branded entertainment or ads (&quot;<strong>Work</strong>&quot;). Each Licensed Track downloaded by Licensee is licensed solely for a particular Work and, to the extent that Licensee uses that same audio track in a different Work, such use will count as an additional and separate Licensed Track against the total number of Licensed Tracks licensed under this License. The foregoing license is granted solely for the purpose of:</p>
        <ul>
          <li>combining and synchronizing the Licensed Tracks with a Work; and</li>
          <li>editing, looping, enhancing, or modifying the sound recording embodied in the Licensed Tracks (or any part thereof), provided that no such change shall alter the fundamental character of the portion of the Licensed Tracks.</li>
          <li>Licensor hereby grants to Licensee a perpetual (subject to Section 5), non-exclusive, sublicenseable through multiple tiers, right and license within the Territory to:</li>
          <li>distribute the Work via the internet for use on computers, mobile phones and mobile devices.</li>
        </ul>


        <h3 className="gCSubHeading">4. Restrictions</h3>
        <p>Except as expressly permitted above, neither Licensee nor its permitted sublicensees may use the Licensed Tracks:</p>
        <ul>
          <li>as a standalone feature separate from a Work;</li>
          <li>on broadcast television, radio or movies;</li>
          <li>with a Work distributed in any manner other than via the internet or mobile devices;</li>
          <li>on or with any pornographic, hateful, gratuitously violent, libelous, defamatory, fraudulent, infringing or illegal content.</li>
        </ul>
        <p>Further, Licensee may not use the Licensed Tracks for political purposes (including, but not limited to, supporting or opposing any government policy, government official, political action, or candidate for political office).</p>

        <h3 className="gCSubHeading">5. Termination</h3>
        <p>This License is perpetual. However, if Licensee breaches the License, Licensor reserves the right to terminate the License immediately.</p>

        <h3 className="gCSubHeading">6. Royalties</h3>
        <p>The Licensed Tracks may be subject to royalties and fees due to third party performing rights organizations, unions or guilds, and/or similar rights organizations or collection societies.</p>

        <h3 className="gCSubHeading">7. Intellectual Property</h3>
        <p>As between the parties, Licensor owns all right, title, and interest in and to the Licensed Tracks. Except as expressly set forth in this License, nothing contained herein shall be deemed to convey or transfer to Licensee any interest, including copyright, in any Licensed Tracks hereunder. All rights not expressly granted by Licensor to Licensee pursuant to this License are specifically reserved by Licensor.</p>

        <h3 className="gCSubHeading">Licensee&apos;s Representations and Warranties</h3>
        <p>Licensee hereby represents and warrants that it is of legal age in its jurisdiction and that it has the power, capacity and authority to enter into this License. If Licensee is entering into this License on behalf of an organization, Licensee represents and warrants that it has the authority to bind that organization, in which case &quot;Licensee&quot; shall mean that organization.</p>

        <h3 className="gCSubHeading">Licensor&apos;s Representations and Warranties</h3>
        <p>Licensor hereby represents and warrants that: (a) Licensor has the power, capacity, and authority to enter into this License; (b) Licensor has all necessary rights (including consents, authorizations, licenses, and permissions) to license the Licensed Tracks (including all rights in the musical composition and master recording) to Licensee under the terms hereof; and (c) Licensee&apos;s exercise of rights hereunder will not infringe any third party&apos;s intellectual property rights.</p>


        <h3 className="gCSubHeading">10. Indemnification</h3>
        <p>Licensee agrees to indemnify and hold harmless Licensor from and against any claim, loss, damage, cost and expense (including reasonable attorneys&apos; fees), arising out of any third party claim arising out of a breach of this License by Licensee.</p>

        <h3 className="gCSubHeading">11. Limitation of Liability</h3>
        <p>LICENSOR&apos;S MAXIMUM LIABILITY TO LICENSEE UNDER ANY CIRCUMSTANCES IS LIMITED TO THE AMOUNT OF THE FEE LICENSEE PAID FOR THE LICENSE.</p>

        <h3 className="gCSubHeading">12. General</h3>
        <p>You agree that damages for breach of this License are difficult to calculate accurately because of the negative impacts on our goodwill and reputation in the marketplace and with our Artists and therefore, you and we agree to fix as liquidated damages for breach of this License, and not as a penalty, an amount equal to $25,000 USD, plus our reasonable attorneys’ fees and costs, which you and we agree represent damages actually sustained by us for your breach. These liquidated damages are meant to be and are cumulative of and in addition to our other remedies and you agree they are a reasonable measure of the harm that would be suffered by Licensor in addition to any damages owed by Licensee to Artists.</p>

        <p>This License: (a) contains the entire agreement between Licensor and Licensee and supersedes any prior agreements relating to the subject matter hereof; (b) is severable; (c) may not be transferred or assigned by Licensee; (d) is binding on permitted successors and assigns; and (e) is governed by the law of the State of Washington (without regard to conflicts of law principles). Any dispute arising out of or relating to this License shall be commenced in the federal or state courts located in King County, Washington. In any such dispute, the substantially prevailing party shall be entitled to its reasonable attorneys&apos; fees. No modification or waiver of this License will be binding unless made in a writing signed by Licensee and one of Licensor&apos;s duly authorized representatives. No failure by Licensor to exercise a right or remedy shall be deemed a waiver of any further right or remedy.</p>
      </div>
    </div>
  );
}

export default LargeBusiness;
