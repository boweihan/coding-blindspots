import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from "@testing-library/react"
import { Waitlist } from "../Waitlist"

it('on initial render, submit button is disabled', () => {
    render(<Waitlist/>)

    screen.debug()
})