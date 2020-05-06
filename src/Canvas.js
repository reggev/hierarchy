import React from "react";
import PropTypes from "prop-types";
import { ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";

export default class App extends React.PureComponent {
  state = { tool: TOOL_AUTO, value: undefined };
  Viewer = null;

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  };

  componentDidMount() {
    this.Viewer.fitSelection(
      this.props.width / -2,
      0,
      this.props.width,
      this.props.height
    );
  }

  changeTool(nextTool) {
    this.setState({ tool: nextTool });
  }

  changeValue(nextValue) {
    this.setState({ value: nextValue });
  }

  fitToViewer() {
    this.Viewer.fitToViewer();
  }

  fitSelection() {
    this.Viewer.fitSelection(0, 40, 200, 200);
  }

  zoomOnViewerCenter() {
    this.Viewer.zoomOnViewerCenter(1.1);
  }

  render() {
    return (
      <ReactSVGPanZoom
        width={this.props.width}
        disableDoubleClickZoomWithToolAuto={true}
        height={this.props.height}
        detectAutoPan={false}
        customToolbar={() => null}
        background="white"
        ref={(Viewer) => (this.Viewer = Viewer)}
        tool="auto"
        onChangeTool={(tool) => this.changeTool(tool)}
        value={this.state.value}
        onChangeValue={(value) => this.changeValue(value)}
      >
        <svg width={this.props.width} height={this.props.height}>
          {this.props.children}
        </svg>
      </ReactSVGPanZoom>
    );
  }
}