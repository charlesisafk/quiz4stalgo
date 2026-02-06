import React from 'react'
import { Card } from 'react-bootstrap'

function Task({ task }) {
  return (
    <Card className="my-3 p-3 rounded">
        <Card.Body>
            <Card.Title as='div'>
                <strong>{task.name}</strong>
            </Card.Title>
            <Card.Text as='div'>
                <div className='my-3'>
                    {task.description}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    Status: {task.status}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    Hours Consumed: {task.hoursConsumed}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    User Assigned: {task.userAssigned}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    Start Date: {new Date(task.startDate).toLocaleDateString()}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    End Date: {new Date(task.endDate).toLocaleDateString()}
                </div>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Task