import React, {
  Component
} from "react";
import { connect } from "react-redux";

//https://github.com/fdecampredon/rx-react
//https://github.com/reactjs/reselect
//https://github.com/acdlite/recompose

class Base extends Component {

  render() {
    console.log(this.props);
    return <div>{this.props.base}</div>;
  }

}

export default connect(state => {
  return {
    base : state.getIn(["base", "value"])
  };
})(Base);
