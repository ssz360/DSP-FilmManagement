import "./signalAnimation.component.css";
function SignalAnimationComponent() {
  return (
    <div className="beacon-wrapper">
      <span className="signal beacon--epicentre"></span>
      <span className="signal signal--wave"></span>
      <span className="signal signal--wave signal--delay"></span>
    </div>
  );
}

export default SignalAnimationComponent;
