import React from 'react';
import Papa from 'papaparse' ;
import DataTable from "react-data-table-component";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      tableData:undefined,
      delimiter:',',
      rowCount: '2',
      columns: [],
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  setDelimiter = e =>this.setState({delimiter: e.target.value})
  setRowcount = e => this.setState({rowCount:e.target.value});

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true,
      preview: this.state.rowCount,
      delimiter: this.state.delimiter
    });
  };

  updateData(result) {
    var data = result.data;
    let columnName =  Object.keys(result.data[0]);
    let columns = columnName.map((e)=>{
      return { name: e, selector: e}
    });
    this.setState({columns: columns,tableData : data});
  }

  render() {
    return (
      <div className="App container">
        <h2 data-test-handle="page-heading">Import CSV File!</h2>
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="file">Upload file</label>
            <input
              className="form-control"
              type="file"
              ref={(input) => {
                this.filesInput = input;
              }}
              name="file"
              placeholder={null}
              id="file"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="delimiter">Delimiter</label>
            <input
              className="form-control"
              name="delimiter"
              onChange={this.setDelimiter}
              id="delimiter"
            />
          </div>

          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="rows">Rows</label>
            <input
              className="form-control"
              name="row-count"
              type="number"
              onChange={this.setRowcount}
              id="rows"
            />
          </div>
          <button onClick={this.importCSV} className="btn btn-primary mb-2">
            Render file
          </button>
          
        </div>
        {this.state.tableData && (
          <DataTable
            title="Parsed Data"
            columns={this.state.columns}
            data={this.state.tableData}
            pagination={true}
          />
        )}
      </div>
    );
  }
}

export default App;
