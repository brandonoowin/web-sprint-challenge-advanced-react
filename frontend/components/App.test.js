import AppFunctional from "./AppFunctional"
import React from "react" 
import { render, screen, waitFor } from '@testing-library/react'
// Write your tests here
test('sanity', () => {
  expect(false).toBe(false)
})

test('renders grid to DOM without Errors', () => {
  render(
    <AppFunctional />
  )
})

