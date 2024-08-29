import classes from './TrendingQuizWireFrame.module.css'

function TrendingQuizWireFrame() {
  return (
    <>
    <div className={classes.container}>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
    </div>
    <h1>Trending Quizs</h1>
     <CardSkeleton/>
    </>
  );
}

export default TrendingQuizWireFrame;


function Skeleton(){
    return (
        <div className={classes.cardSkeleton}>
        <div className={`${classes.skeletonHeader} ${classes.skeleton}`}></div>
      </div>
    )
}


function CardSkeleton(){
return <div className={`${classes.skeletonHeader} ${classes.skeleton}`}></div> 
}