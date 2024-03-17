import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ImageBox: React.FC<{ title: string, content: string, buttonText: string, imagePath: string }> = (
    props
) => {
    return (
        <Card>
            <CardMedia
                sx={{ height: 200 }}
                image={props.imagePath}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{props.buttonText}</Button>
            </CardActions>
        </Card>
    );
}

export default ImageBox;