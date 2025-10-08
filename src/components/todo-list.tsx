"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Edit2, Check, X } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ])
      setInputValue("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const saveEdit = (id: number) => {
    if (editingText.trim()) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editingText } : todo)))
      setEditingId(null)
      setEditingText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center">My Todo List</h1>
          <p className="text-center mt-2 text-primary-foreground/80">Stay organized and get things done</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Add Todo Input */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a new task..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  className="flex-1"
                />
                <Button onClick={addTodo}>Add Task</Button>
              </div>
            </CardContent>
          </Card>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <p className="text-center text-muted-foreground">No tasks yet. Add one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              todos.map((todo) => (
                <Card key={todo.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          todo.completed ? "bg-primary border-primary" : "border-input hover:border-primary"
                        }`}
                      >
                        {todo.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                      </button>

                      {/* Todo Text or Edit Input */}
                      {editingId === todo.id ? (
                        <Input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(todo.id)
                            if (e.key === "Escape") cancelEdit()
                          }}
                          className="flex-1"
                          autoFocus
                        />
                      ) : (
                        <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                          {todo.text}
                        </span>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {editingId === todo.id ? (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => saveEdit(todo.id)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={cancelEdit}>
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => startEditing(todo)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <Card>
              <CardContent className="py-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total tasks: {todos.length}</span>
                  <span>Completed: {todos.filter((t) => t.completed).length}</span>
                  <span>Remaining: {todos.filter((t) => !t.completed).length}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 px-4 mt-auto">
        <div className="max-w-3xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Todo App. Built with Next.js and shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}
