import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Project({ project }) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/project/${project._id}`}>   
            <Card.Img src={project.image} variant='top' />
        </Link>
        <Card.Body>
            <Link to={`/project/${project._id}`}>
                <Card.Title as='div'>
                    <strong>{project.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    {project.description}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    Status: {project.status}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    Hours Consumed: {project.hoursConsumed}
                </div>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Project