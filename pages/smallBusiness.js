import { useRouter } from 'next/router'

function SmallBusiness() {
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
        <h1 className="gCHeading">Small Business License Agreement</h1>
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
        <p>Work means the audiovisual work in which the Licensed Tracks will be used, as identified and described by Licensee in the Audiosocket Storefront during the License purchase process. Work Title must identify any sublicensee if applicable.</p>
        <h5>Small Business</h5>
        <p>Small Business means a Company, Corporation, Non-Profit Organization or any other business entity with no more than 50 employees.</p>

        <h3 className="gCSubHeading">2. Licensed Tracks</h3>
        <h5>Licensed Tracks Title(s) and Information Number(s):</h5>

        <p>replace_with_licensed_item (Audiosocket Track # replace_with_licensed_item_id)</p>

        <h5>License Fee:</h5>

        <p>replace_with_license_price</p>

        <h3 className="gCSubHeading">3. License and License Restrictions</h3>
        <h5>License</h5>
        <p>Audiosocket grants to Licensee the non-exclusive license, privilege and authority to copy, perform, edit and/or loop portions of (provided that no such change shall alter the fundamental character of the portion of the Licensed Track), and use the musical composition embedded in the Licensed Tracks in synchronization or timed relation in the Work during the Term throughout the world for the Permitted Purposes set forth in Section 3 (d).</p>
        <h5> License Restrictions</h5>
        <p>The License granted in Section 3 (a) is conditioned upon Licensee&apos;s compliance with the restrictions set forth in this Section 3 (b).</p>
        <ul>
          <li><strong>Small Business Use Only:</strong> Licensee must be a Small Business as of the Effective Date. For clarity, if you are creating the Work for a Sublicensee, that Sublicensee must be a Small Business as of the Effective Date.</li>
          <li><strong>Other Restrictions:</strong> Licensee must not use the Licensed Tracks:
            <ul>
              <li>For any business with more than 50 employees;</li>
              <li>In any audiovisual work other than the Work. For clarity, use of the Licensed Track in multiple videos will require separate licenses;</li>
              <li>Separately and independently as a music-only product;</li>
              <li>In broadcast, cable, web television, video games, mobile applications, theatrical releases or radio;</li>
              <li>To physically perform or lip-synch the lyrics of the music of the Licensed Track, or in any way use the artist&apos;s image or likeness except
for the purposes of providing artist credit;</li>
              <li>In pornographic work; or</li>
              <li>In any audiovisual work or any other use that has a political purpose (including, but not limited to, supporting or opposing any government policy, government official, political action, or candidate for political office).</li>
            </ul>
          </li>
        </ul>
        <p>The synchronization license is granted upon the express condition that the musical composition contained in the Licensed Tracks shall not be used to manufacture, sell, license, or exploit sound records or otherwise be used apart from the Work by the Licensee.</p>
        <h5>Sublicenses.</h5>
        <ul>
          <li>have been identified to Audiosocket by Licensee as a Sublicensee in the Work Title;</li>

          <li>are Small Businesses; and</li>
          <li>comply with all terms and conditions set forth in this License. The scope of any such sublicense shall be no greater than the rights set forth in this License. Licensee shall have no other right to sublicense the Licensed Tracks except as expressly set forth in this Section 3 (c).</li>
        </ul>
        <h5>Permitted Purposes; Distribution.</h5>
        <ul>
          <li>The Work may be a video that is intended for promotional, editorial, informational or entertainment purposes. The Work may also be a video that advertises or promotes a brand, product, or service of the Licensee or a permitted Sublicensee.</li>

          <li>This License grants Licensee the right to publicly display and distribute the Licensed Tracks as embodied in only the Work in the following ways:
            <ul>
              <li>online, including on website(s) and social media sites/platforms such as Vimeo, Facebook, Twitch, Tik Tok and YouTube; which includes media buys; and</li>
              <li>via distribution of the Work on DVD&apos;s or flashdrives; and</li>
              <li>at a tradeshow, conference, or other Company-related event (rights to any other method of public performance or distribution is not granted under this License and may cause Licensee to incur additional royalty fees for such use). Please contact <a href="mailto:licensing@audiosocket.com">licensing@audiosocket.com</a> should you need additional rights.</li>
            </ul>
          </li>
        </ul>

        <h5> Damages </h5>
        <p>Any use of the Licensed Tracks outside the scope of the license rights granted hereunder may subject the Licensee to damages to Audiosocket and to third parties, including Audiosocket&apos;s licensors.</p>

        <h3 className="gCSubHeading">4. Term and Termination</h3>
        <ul>
          <li>This License begins on the Effective Date and is granted in perpetuity. This License shall terminate immediately without notice if Licensee breaches this License.</li>
          <li>If this License terminates for any reason, Sections 3(e), 5, 6, and 9-12 will continue to survive.</li>
        </ul>

        <h3 className="gCSubHeading">5. Additional Terms</h3>
        <p>This License incorporates by reference the most current Terms of Use and Privacy Policy of Audiosocket available on <a href="http://www.audiosocket.com/music/legal" rel="nofollow">www.audiosocket.com</a></p>

        <h3 className="gCSubHeading">6. Intellectual Property</h3>
        <p>As between the parties, Audiosocket or its licensors owns all right, title, and interest in and to the Licensed Tracks. All rights not expressly granted herein are specifically reserved by Audiosocket or its licensors.</p>

        <h3 className="gCSubHeading">7. Royalties</h3>
        <p>In consideration of the rights granted under this License, Licensee agrees to pay the License Fees.</p>

        <h3 className="gCSubHeading">8. Credit and Attribution</h3>
        <p>Licensee shall use best efforts to credit Audiosocket and the artist, and include such credit in the final edited version of the Work in each case in which credits for music are included in the Work. No casual or inadvertent failure by Licensee to comply with the credit requirements set forth above, nor any failure by third parties to so comply, shall constitute a breach of this License by Licensee. Recommended language for credit is: &quot;[Name of Licensed Track]&quot; by [Name of Artist], licensed by Audiosocket.&quot; If the Work is posted to YouTube, the credit language should be posted in the video description.</p>

        <h3 className="gCSubHeading">9. Representations and Warranties</h3>
        <h5>Audiosocket</h5>
        <p>Audiosocket hereby represents and warrants that: (i) it has the power, capacity, and authority to enter into this Agreement; (ii) it has all necessary rights to license the Licensed Tracks to Licensee under the terms of this License; and (iii) Licensee&apos;s exercise of rights hereunder will not infringe any third party&apos;s intellectual property rights.</p>
        <h5>Licensee</h5>
        <p>Licensee hereby represents and warrants that: (i) it has the power, capacity, and authority to enter into this Agreement; (ii) it meets the criteria set forth in Section 3 .</p>
        <h3 className="gCSubHeading">10. Indemnification</h3>
        <p>Licensee agrees to indemnify, defend, and hold harmless Audiosocket and its agents and licensors from and against any claim, actions or demands by a third party and all related liabilities, losses, damages, judgments, settlements, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or based on any breach of any representation, warranty or covenant made herein. Licensee shall provide Audiosocket prompt notice in writing of any such claims under this Section 10 and provide Audiosocket with reasonable information and assistance, at Audiosocket&apos;s expense, to help the defend such Claims.</p>

        <h3 className="gCSubHeading">11. Limitation of Liability</h3>
        <p>IN NO EVENT SHALL AUDIOSOCKET BE LIABLE TO LICENSEE OR ITS AFFILIATES FOR ANY SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES OF ANY NATURE ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF AUDIOSOCKET HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; AND IN NO EVENT SHALL THE TOTAL CUMULATIVE LIABILITY OF AUDIOSOCKET TO LICENSEE OR ANY THIRD PARTY RELATED TO THIS AGREEMENT EXCEED THE AMOUNT OF THE LICENSE FEE PAID BY LICENSEE HEREUNDER. THE FOREGOING SHALL APPLY REGARDLESS OF THE NEGLIGENCE OR OTHER FAULT OF AUDIOSOCKET AND REGARDLESS OF WHETHER SUCH LIABILITY ARISES IN CONTRACT, NEGLIGENCE, TORT, STRICT LIABILITY OR UNDER ANY OTHER THEORY OF LIABILITY.</p>

        <h3 className="gCSubHeading">12. General</h3>
        <h5>Governing Law</h5>
        <p>This License is governed by the law of the State of Washington (without regard to conflicts of law principles). Any dispute arising out of or relating to this License shall be commenced in the federal or state courts located in King County, Washington. In any such dispute, the substantially prevailing party shall be entitled to recover its reasonable attorneys&apos; fees from the other party.</p>
        <h5>Damages</h5>
        <p>Licensee agrees that damages for the breach of this License are difficult to accurately calculate because of the negative impacts on Audiosocket&apos;s goodwill and reputation in the marketplace and with its artists. Therefore, both parties agree to fix as liquidated damages, and not as a penalty, an amount equal to $25,000 USD, plus Audiosocket&apos;s reasonable attorneys&apos; fees and costs. These liquidated damages are meant to be in addition to Audiosocket&apos;s other remedies, and Licensee agrees they are a reasonable measure of the harm that would be suffered by Audiosocket.</p>
        <h5>Injunctive Relief</h5>
        <p>If Licensee breaches this License, Audiosocket will be entitled to injunctive relief without necessity of posting bond in order to restrain Licensee&apos;s breach.</p>
        <h5>Assignment; Waiver; Modification</h5>
        <p>This License may not be transferred or assigned by Licensee, and is binding on permitted successors and assigns. No modification of this License will be binding unless made in a writing signed by both parties. No waiver of any term, condition or obligation of this License will be valid unless made in writing and signed by the party to which such performance is due. No failure or delay by any party at any time to enforce one or more of the terms, conditions or obligations of this License will (i) constitute waiver of such term, condition or obligation, (ii) preclude such party from requiring performance by the other party at any later time, or (iii) be deemed to be a waiver of any other subsequent term, condition or obligation, whether of like or different nature.</p>
        <h5>Entire License; Severability</h5>
        <p>This License constitutes the entire agreement between the parties with respect to the subject matter hereof and merges all prior and contemporaneous communications. If any provision of this License is held to be invalid or unenforceable to any extent, then the remainder of this License will have full force and effect and such provision will be interpreted, construed or reformed to the extent reasonably required to render the same valid, enforceable and consistent with the original intent underlying such provision.</p>
        <h5>Notices</h5>
        <p>Any notice of breach or termination hereunder shall be sent via express or registered mail. Notices sent to Audiosocket shall be sent to storefront@audiosocket.com. Notices to Licensee shall be sent to the address provided by Licensee in its online account with Audiosocket. Notices will be deemed delivered upon receipt or three (3) business days after deposit with such mail service.</p>
      </div>
    </div>
  );
}

export default SmallBusiness;
