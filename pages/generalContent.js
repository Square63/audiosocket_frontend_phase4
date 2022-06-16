import withPrivateRoute from "../components/withPrivateRoute";



function generalContent() {
  return (
    <div className="generalContent">
      <div className="fixed-container">
        <h1 className="gCHeading">General Content Page</h1>
        <h3 className="gCSubHeading">Subheading</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a facilisis ex. Vestibulum eget arcu urna. Suspendisse sed ligula gravida, imperdiet arcu ut, efficitur purus. Cras gravida imperdiet vulputate. <strong>Sed nec varius eros</strong>. Praesent lobortis quam nulla, sit amet dictum augue consectetur ac. Curabitur et lectus gravida, ornare ex eu, euismod est. Donec <a href="javascript:void(0)">euismod mauris a lacus</a> pulvinar, sit amet pulvinar diam porta. Quisque elementum elementum leo et sagittis. In maximus odio non nulla posuere, id tristique lacus aliquam. Curabitur cursus leo sit amet convallis feugiat. Nunc sagittis molestie rhoncus. Sed ac ex sit amet justo dignissim vestibulum. Praesent aliquam lacus nulla. Nulla mattis ipsum sit amet ipsum luctus tincidunt. Donec orci sapien, sagittis ac enim vitae, molestie vehicula dui.</p>
        <p>Aenean sed egestas magna. Mauris nunc diam, ullamcorper vitae bibendum id, convallis quis lacus. Aliquam erat volutpat. Aenean a libero sit amet sem euismod venenatis. Integer a vulputate magna. Nulla interdum rhoncus tristique. Suspendisse purus dui, imperdiet quis sapien elementum, egestas auctor velit. Phasellus faucibus imperdiet sem id vulputate. Aenean molestie augue eros, at vulputate enim volutpat nec. Morbi a ante at ex viverra finibus eget sit amet lectus. Proin quis cursus tortor. Nulla aliquam ligula justo, non hendrerit nulla aliquam nec.</p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Integer a facilisis ex. Vestibulum eget arcu urna.</li>
          <li>Suspendisse sed ligula gravida, imperdiet arcu ut, efficitur purus.</li>
          <li>Cras gravida imperdiet vulputate.</li>
        </ul>
        <p>Ullamcorper vitae bibendum id, convallis quis lacus. Aliquam erat volutpat. Aenean a libero sit amet sem euismod venenatis. Integer a vulputate magna. Nulla interdum rhoncus tristique. Suspendisse purus dui, imperdiet quis sapien elementum, egestas auctor velit. Phasellus faucibus imperdiet sem id vulputate. Aenean molestie augue eros, at vulputate enim volutpat nec. Morbi a ante at ex viverra finibus eget sit amet lectus. Proin quis cursus tortor. Nulla aliquam ligula justo, non hendrerit nulla aliquam nec.</p>
        <hr />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a facilisis ex. Vestibulum eget arcu urna. Suspendisse sed ligula gravida, imperdiet arcu ut, efficitur purus. Cras gravida imperdiet vulputate. <strong>Sed nec varius eros</strong>. Praesent lobortis quam nulla, sit amet dictum augue consectetur ac. Curabitur et lectus gravida, ornare ex eu, euismod est. Donec <a href="javascript:void(0)">euismod mauris a lacus</a> pulvinar, sit amet pulvinar diam porta. Quisque elementum elementum leo et sagittis. In maximus odio non nulla posuere, id tristique lacus aliquam. Curabitur cursus leo sit amet convallis feugiat. Nunc sagittis molestie rhoncus. Sed ac ex sit amet justo dignissim vestibulum. Praesent aliquam lacus nulla. Nulla mattis ipsum sit amet ipsum luctus tincidunt. Donec orci sapien, sagittis ac enim vitae, molestie vehicula dui.</p>
        <p>Aenean sed egestas magna. Mauris nunc diam, ullamcorper vitae bibendum id, convallis quis lacus. Aliquam erat volutpat. Aenean a libero sit amet sem euismod venenatis. Integer a vulputate magna. Nulla interdum rhoncus tristique. Suspendisse purus dui, imperdiet quis sapien elementum, egestas auctor velit. Phasellus faucibus imperdiet sem id vulputate. Aenean molestie augue eros, at vulputate enim volutpat nec. Morbi a ante at ex viverra finibus eget sit amet lectus. Proin quis cursus tortor. Nulla aliquam ligula justo, non hendrerit nulla aliquam nec.</p>
        <div className="gCBtnWrapper">
          <a href="javascript:void(0)" className="btn btnMainLarge">Primary Button</a>
          <a href="javascript:void(0)" className="btn btnMainLarge inBlack">Secondary Button</a>
        </div>
      </div>
    </div>
  );
}
export default withPrivateRoute(generalContent);