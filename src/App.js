import React, { Component } from 'react'
import { Button, Input,} from 'antd'
import * as clipboard from "clipboard-polyfill"

const { TextArea } = Input;
const data = {
    "param.code.name": "姓名",
    "param.code.nickname": "昵称",
}

 class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentMessage: '姓名：，昵称：',
        }
    }
    render() {
        let {
            currentMessage
        } = this.state
        return (
            <div className="app">
                <div className="wrap">
                    <div className="title">
                    <Button onClick={this.handleCopy.bind(this,"param.code.name")}>姓名</Button>
                    <Button onClick={this.handleCopy.bind(this,"param.code.nickname")}>昵称</Button>
                    </div>
                    <TextArea 
                    rows={10}
                    value={currentMessage}
                    onPaste={this.handlePaste.bind(this)}
                    onChange={this.handleInput.bind(this, 'currentMessage')}
                    ></TextArea>
                    <div className="btn">
                    <Button onClick={this.handleControl.bind(this, 'delete')}>去除[value]</Button>
                    <Button onClick={this.handleControl.bind(this, 'add')}>补充[value]</Button>
                    </div>
                </div>       
            </div>
        )
    }
}

// 事件
Object.assign(App.prototype,{
    // 点击复制内容
    handleCopy(field){
        console.log(field)
        let temp = `[${data[field]}(${field})]`
        console.log(temp)
        clipboard.writeText(temp)
    },
    // 去除value和补充value
    handleControl(field) {
        let {
          currentMessage,
        } = this.state
        if (field === 'add' && currentMessage.indexOf('[') < 0) {
          currentMessage = currentMessage.replace(/\((.+?)\)/g, function (word) {
            let key = word.slice(1, word.length - 1)
            return `[${data[key]}${word}]`
          });
          this.setState({
            currentMessage
          })
        } else if (field === 'delete') {
          let temp = currentMessage.replace(/\[.*?\(/g, '(').replace(/]/g, '')
          this.setState({
            currentMessage: temp
          })
        }
      },
    handlePaste(){}
})
//受控组件
Object.assign(App.prototype, {
  // 假设没有受控组件 那么textArea值是写死的
    handleInput(field, e) {
      this.setState({
        [field]: e.target.value
      })
    }
  })

export default App;