import React, { Component } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Jumbotron, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css';
import Item from 'antd/lib/list/Item';

class ImportExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      direction: {
          type: 'asc'
      }
     

    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
    this.sortBy = this.sortBy.bind(this);
  }

  renderFile = (fileObj) => {
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }

  fileHandler = (event) => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }
      else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  sortBy(key){

  }


  render() {
    const columns = [
      {
        title: 'STT',
        dataIndex: '0',
        defaultSortOrder: 'descend',
      },
      {
        title: 'SBD',
        dataIndex: '1',
      },
      {
        title: 'Họ Tên',
        dataIndex: '2',
      },
      {
        title: 'TÊN',
        dataIndex: '3',
      },
      {
        title: 'Ngày sinh',
        dataIndex: '4',
      },
      {
        title: 'Phái',
        dataIndex: '5',
      },
      {
        title: 'ĐTƯT',
        dataIndex: '6',
      },
      {
        title: 'KVƯT',
        dataIndex: '7',
      },
      {
        title: 'Năm TN',
        dataIndex: '8',
      },
      {
        title: 'Tổng điểm xét tuyển',
        dataIndex: '9',
      },
      {
        title: 'Ngành TT',
        dataIndex: '10',
      },
      {
        title: 'Tên ngành',
        dataIndex: '11',
      },
    ];
    return (
      <div>
        <div>
          <Jumbotron className="jumbotron-background">
            <h1 className="display-3"></h1>
          </Jumbotron>
        </div>
        <Container>
          <form>
            <FormGroup row>
              <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>
              <Col xs={4} sm={8} lg={10}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button color="info" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                    <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                  </InputGroupAddon>
                  <Input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                  <FormFeedback>
                    <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                      Please select a .xlsx file only !
                </Fade>
                  </FormFeedback>
                </InputGroup>
                
              </Col>
            </FormGroup>
          </form>

          {this.state.dataLoaded &&
            <div>
              {/* <Card body outline color="secondary" className="restrict-card"> */}

                {/* <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}
                
              {/* </Card> */}
              
            </div>}
        </Container>
        <Button onClick={this.sortBy(9)}>Sắp xếp theo điểm</Button>
        <Table columns={columns} dataSource={this.state.rows} />
      
      </div>
    );
  }
}

export default ImportExcel;