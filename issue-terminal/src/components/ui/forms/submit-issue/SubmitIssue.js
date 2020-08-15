import React, { Component } from 'react'
import styled from 'styled-components'

const Styles = styled.div`
html, body {
    height: 100%;
    background: #e0e0e0;
    font-family: sans-serif;
    font-size: 14px;
}
#wrap {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 60px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}
.input::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: #0f1041;
}
.input-header {
    position: relative;
    padding-top: 80px;
    color: #fff;
}
.input-header h1 {
    padding-bottom: 25px;
    font-size: 3.25em;
    font-weight: 100;
}
.input-content {
    position: relative;
    padding: 44px 55px;
    background: #fff;
    z-index: 10;
}
.input-content h2 {
    padding-bottom: 45px;
    font-size: 1.625em;
    font-weight: bold;
    vertical-align: middle;
}
.input-content h2 span {
    display: inline-block;
    margin-left: 10px;
    padding: 5px 6px 3px;
    border: 1px solid #ffca00;
    border-radius: 4px;
    font-size: 0.85rem;
    vertical-align: middle;
    color: #ffca00;
}
.input-content .inputbox {
    overflow: hidden;
    position: relative;
    padding: 15px 0 28px 200px;
}
.input-content .inputbox-title {
    position: absolute;
    top: 15px;
    left: 0;
    width: 200px;
    height: 30px;
    color: #666;
    font-weight: bold;
    line-height: 30px;
}
.input-content .inputbox-content {
    position: relative;
    width: 100%;
}
.input-content .inputbox-content input {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    font-size: 14px;
    border: 0;
    background: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    border-radius: 0;
    -webkit-appearance: none;
}
.input-content .inputbox-content input:focus ~ label, .input-content .inputbox-content input:valid ~ label {
    color: #2962ff;
    transform: translateY(-20px);
    font-size: 0.825em;
    cursor: default;
}
.input-content .inputbox-content input:focus ~ .underline {
    width: 100%;
}
.input-content .inputbox-content label {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    color: #ccc;
    cursor: text;
    transition: all 200ms ease-out;
    z-index: 10;
}
.input-content .inputbox-content .underline {
    content: '';
    display: block;
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2962ff;
    transition: all 200ms ease-out;
}
.input-content .btns {
    padding: 30px 0 0 200px;
}
.input-content .btns .btn {
    display: inline-block;
    margin-right: 2px;
    padding: 10px 25px;
    background: none;
    border: 1px solid #c0c0c0;
    border-radius: 2px;
    color: #666;
    font-size: 1.125em;
    outline: none;
    transition: all 100ms ease-out;
}
.input-content .btns .btn:hover, .input-content .btns .btn:focus {
    transform: translateY(-3px);
}
.input-content .btns .btn-confirm {
    border: 1px solid #2962ff;
    background: #2962ff;
    color: #fff;
}
`




class SubmitIssue extends Component {
    render() {
        return (
            <div>
                <Styles>
                    <div id="wrap" class="input">
                        <header class="input-header">
                            <h1>New Issue Information</h1>
                        </header>
                        <section class="input-content">
                            <div class="input-content-wrap">
                                <dl class="inputbox">
                                    <dt class="inputbox-title">Short summary</dt>
                                    <dd class="inputbox-content">
                                        <input id="input0" type="text" required />
                                        <label for="input0">ID</label>
                                        <span class="underline"></span>
                                    </dd>
                                </dl>
                                <dl class="inputbox">
                                    <dt class="inputbox-title">Is it reproducible </dt>
                                    <dd class="inputbox-content">
                                        <input id="input1" type="text" required />
                                        <label for="input1">Password</label>
                                        <span class="underline"></span>
                                    </dd>
                                </dl>
                                <dl class="inputbox">
                                    <dt class="inputbox-title">Short summary</dt>
                                    <dd class="inputbox-content">
                                        <select id="cars">
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="vw">VW</option>
                                            <option value="audi" selected>Audi</option>
                                        </select>
                                    </dd>
                                </dl>

                                <div class="btns">
                                    <button class="btn btn-confirm">Sign In</button>
                                    <button class="btn btn-cancel">Cancel</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </Styles>
            </div>
        )
    }
}

export default SubmitIssue;