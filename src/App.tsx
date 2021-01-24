import React, { FormEvent, Fragment, useState, useRef } from 'react'
import { Button, Container, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}))

//Types
type FormElement = React.FormEvent<HTMLFormElement>

interface ITask {
	name: string
	done: boolean
}

function App() {
	const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef(document.createElement('input'));

	const handleSubmit = (e: FormElement) => {
		e.preventDefault()
    addTask(newTask)
    taskInput.current.focus();
	}

	const addTask = (name: string): void => {
		const newTasks: ITask[] = [...tasks, { name, done: false }]
		setTasks(newTasks)
		setNewTask('')
	}

	const toggleDoneTask = (index: number): void => {
		const newTasks: ITask[] = [...tasks]
		newTasks[index].done = !newTasks[index].done
		setTasks(newTasks)
	}

	const deleteTask = (index: number): void => {
    const newTasks:ITask[] = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

	const classes = useStyles()

	return (
		<Fragment>
			<Container fixed>
				<div className='classes.root'>
					<Grid item xs={12}>
						<form onSubmit={handleSubmit}>
							<Input
								type='text'
								onChange={(e) => setNewTask(e.target.value)}
								value={newTask}
                autoFocus
                ref={taskInput}
							/>
						</form>
						{tasks.map((task: ITask, i: number) => {
							return (
								<div key={i}>
									<h2
										style={{ textDecoration: task.done ? 'line-through' : '' }}>
										{task.name}
									</h2>
									<div>
										<Button
											variant='contained'
											color='primary'
											onClick={() => toggleDoneTask(i)}>
											{task.done ? 'x' : '✓'}
										</Button>
									</div>
									<div>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => deleteTask(i)}>
											🗑
										</Button>
									</div>
								</div>
							)
						})}
					</Grid>
				</div>
			</Container>
		</Fragment>
	)
}

export default App
