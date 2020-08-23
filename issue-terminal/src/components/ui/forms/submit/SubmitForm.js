import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import StyledButton from '../../styledButton/StyledButton';

const Styles = styled.div`
html, body {
    min-height: 100%;
}
body, div, form, input, select {
    padding: 0;
    margin: 0;
    outline: none;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    color: #666;
    line-height: 22px;
}
h1, h4 {
    margin: 15px 0 4px;
    font-weight: 400;
}
span {
    color: red;
}
.testbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    padding: 3px;
}
form {
    width: 600px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 5px #ccc;
}
input {
    width: calc(100% - 10px);
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    vertical-align: middle;
}
input:hover, textarea:hover, select:hover {
    outline: none;
    border: 1px solid #095484;
}
.name input {
    margin-bottom: 10px;
}
select {
    padding: 7px 0;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: #e6eef7;
}
option {
    background: #fff;
}
select, table {
    width: 100%;
}
.day-visited, .time-visited {
    position: relative;
}
.day-visited input, .time-visited input {
    width: calc(100% - 12px);
    background: #e6eef7;
}
input[type="date"]::-webkit-inner-spin-button {
    display: none;
}
input[type="time"]::-webkit-inner-spin-button {
    margin: 2px 22px 0 0;
}
.day-visited i, .time-visited i, input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 8px;
    font-size: 20px;
}
.day-visited i, .time-visited i {
    right: 5px;
    z-index: 1;
    color: #a9a9a9;
}
[type="date"]::-webkit-calendar-picker-indicator {
    right: 0;
    z-index: 2;
    opacity: 0;
}
.question-answer label {
    display: block;
    padding: 0 20px 10px 0;
}
.question-answer input {
    width: auto;
    margin-top: -2px;
}
th, td {
    width: 18%;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    text-align: center;
    vertical-align: unset;
    line-height: 18px;
    font-weight: 400;
    word-break: break-all;
}
.first-col, Severity, Reproducible {
    width: 25%;
    text-align: left;
}
textarea {
    width: calc(100% - 6px);
}
.btn-block {
    margin-top: 20px;
    text-align: center;
}

@media (min-width: 568px) {
    .name {
        display: flex;
        justify-content: space-between;
   }
    .name input {
        width: 47%;
        margin-bottom: 0;
   }
    th, td {
        word-break: keep-all;
   }
}
`
const submitForm = (props) => {
    console.log(`[SubmitForm.js] [submitForm] props.options`, props.options);
    console.log(`[SubmitForm.js] [submitForm] props.options.length`, props.options.length);
    console.log(`[SubmitForm.js] [submitForm]`, Array.isArray(props.options));


    let form = (<div>You dont have permission to any project</div>)

    if (true) {
        let availableOptions = (
            <select name="selectedProject" defaultValue={'DEFAULT'}>
                <option value="DEFAULT" hidden disabled>Choose a project</option>
                {
                    props.options.map((x, y) => {
                        return (
                            <option key={y} value={x}>{x}</option>
                        )
                    })
                }

            </select>
        )

        form = (
            <Styles>
                <div className="testbox">
                    <form onSubmit={props.submitHandler}>
                        <h1>Issue Report</h1>
                        <br />
                        <h4>Select project <span>*</span></h4>
                        {availableOptions}
                        <br />
                        <br />
                        <p>Describe the Issue you have noticed / want ot report.</p>
                        {/* <h4>Name</h4>
                            <div className="name">
                                <input type="text" name="name" placeholder="First" />
                                <input type="text" name="name" placeholder="Last" />
                            </div> */}
                        <h4>Issue Tittle</h4>
                        <input type="text" name="name" />
                        <h4>Due date</h4>
                        <div className="day-visited">
                            <input type="date" name="dueDate" />
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        {/* <h4>Time Visited<span>*</span></h4>
                            <div className="time-visited">
                                <input type="time" name="timevisited" required />
                                <i className="fas fa-clock"></i>
                            </div> */}
                        {/* <h4>Dine In / Take Out</h4>
                            <div className="question-answer">
                                <label><input type="radio" value="none" name="Dine" /> Dine In</label>
                                <label><input type="radio" value="none" name="Dine" /> Take Out</label>
                            </div> */}
                        <h4>Age<span>*</span></h4>
                        <select defaultValue={'DEFAULT'}>
                            <option value="DEFAULT" disabled>Choose a salutation ...</option>
                            <option value="under 13">Under 13</option>
                            <option value="13-17">13-17</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55 or older">55 or older</option>
                        </select>
                        {/* <h4>Untitled</h4> */}
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th className="Severity"></th>
                                    <th>Low</th>
                                    <th>Medium</th>
                                    <th>High</th>
                                    <th>Breaking</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="Severity">Severity</td>
                                    <td><input type="radio" value="Low" name="severity" /></td>
                                    <td><input type="radio" value="Medium" name="severity" /></td>
                                    <td><input type="radio" value="High" name="severity" /></td>
                                    <td><input type="radio" value="Breaking" name="severity" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th className="Reproducible"></th>
                                    <th>Rerely</th>
                                    <th>Sometimes</th>
                                    <th>Often</th>
                                    <th>Always</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="Reproducible">Reproducing</td>
                                    <td><input type="radio" value="Rerely" name="reproducible" /></td>
                                    <td><input type="radio" value="Sometimes" name="reproducible" /></td>
                                    <td><input type="radio" value="Often" name="reproducible" /></td>
                                    <td><input type="radio" value="Always" name="reproducible" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <h4>Description, comments, questions or suggestions</h4>
                        <textarea rows="4" name="details"></textarea>
                        <br />
                        <br />
                        <StyledButton>Submit</StyledButton>
                    </form>
                </div>
            </Styles>
        )
    }
    return (
        <div>
            {form}
        </div>
    )
}


export default submitForm;