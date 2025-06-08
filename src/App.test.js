import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders ProductivityHub title', () => {
  render(<App />);
  const titleElement = screen.getByText(/ProductivityHub/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Home navigation button', () => {
    render(<App />);
    const homeButton = screen.getByRole('button', { name: /Home/i });
    expect(homeButton).toBeInTheDocument();
});

test('renders Home page initially', () => {
    render(<App />);
    const welcomeText = screen.getByText(/Welcome to ProductivityHub/i);
    expect(welcomeText).toBeInTheDocument();
});

test('navigates to Todo List when "To-Do List" button is clicked', () => {
    render(<App />);
    const todoButton = screen.getByRole('button', { name: /To-Do List/i });
    fireEvent.click(todoButton);
    const todoListTitle = screen.getByText(/To-Do List/i);
    expect(todoListTitle).toBeInTheDocument();
});

test('navigates to Notes when "Notes" button is clicked', () => {
    render(<App />);
    const notesButton = screen.getByRole('button', { name: /Notes/i });
    fireEvent.click(notesButton);
    const notesTitle = screen.getByText(/Your Notes/i);
    expect(notesTitle).toBeInTheDocument();
});

test('navigates to Planner when "Planner" button is clicked', () => {
    render(<App />);
    const plannerButton = screen.getByRole('button', { name: /Planner/i });
    fireEvent.click(plannerButton);
    const plannerTitle = screen.getByText(/Your Planner/i);
    expect(plannerTitle).toBeInTheDocument();
});

test('navigates to Todo List from Home page "Get Started" button', () => {
    render(<App />);
    const todoGetStartedButton = screen.getAllByRole('button', { name: /Get Started/i })[0]; // Assuming Todo is the first "Get Started"
    fireEvent.click(todoGetStartedButton);
    const todoListTitle = screen.getByText(/To-Do List/i);
    expect(todoListTitle).toBeInTheDocument();
});

test('navigates to Notes from Home page "Create Note" button', () => {
    render(<App />);
    const createNoteButton = screen.getByRole('button', { name: /\+ Create Note/i });
    fireEvent.click(createNoteButton);
    const notesTitle = screen.getByText(/Your Notes/i);
    expect(notesTitle).toBeInTheDocument();
});