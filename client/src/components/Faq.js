import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '60%',
        direction: "rtl",
        // display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%",
        color:"pink",
        fontSize: "200%",
    },
    question: {
        fontSize: "70%",
    },
    answer: {
        fontSize: "60%",
    },
    expanded: {
        backgroundColor: "black",
        color: "white",
    }
}));

function Faq({ match }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ expanded: classes.expanded }}
                >
                    <Typography className={classes.question}>מהו נגיף (וירוס) קורונה?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.answer}>
                        נגיפי קורונה הינם משפחה גדולה של נגיפים (וירוסים) הידועים כגורמים למחלות בבעלי חיים ועלולים לגרום לתחלואה גם בבני אדם.
                        הם קיבלו את שמם עקב הדמיון שלהם במיקרוסקופ אלקטרוני לכתר (קורונה בלטינית).
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ expanded: classes.expanded }}
                >
                    <Typography className={classes.question}>
                        מה לגבי מחלימים? האם יסבלו מהשלכות לטווח ארוך? האם יכולים להידבק שוב במחלה?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.answer}>
                        עדיין אין מידע ברור לגבי סיבוכים או פגיעות ארוכות טווח בקרב המחלימים.
                        לגבי הדבקה חוזרת, ההנחה היא כי מי שהחלים מחוסן בשלב זה ולא צפוי להידבק שוב בתקופה הקרובה. עם זאת, עדיין לא ידוע האם הנגיף יתנהג בעתיד הרחוק כמו נגיף השפעת אשר משתנה כל הזמן ויישאר איתנו.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ expanded: classes.expanded }}
                >
                    <Typography className={classes.question}>איך מאבחנים את המחלה שגורם נגיף קורונה?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.answer}>
                    אבחנת המחלה נעשית באמצעות בדיקה מעבדתית, המתבצעת מדגימה של הפרשות מדרכי הנשימה. בבדיקה נבדקת באופן ישיר נוכחות של חומר גנטי של הנגיף בהפרשות. בבדיקה מוכנס מטוש (מקל שבקצהו צמר גפן) ללוע ולאף הנבדקים לאיסוף דגימת הפרשות.
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ expanded: classes.expanded }}
                >
                    <Typography className={classes.question}>האם חיית מחמד עלולה לסכן אדם בקורונה והאם אדם עלול לסכן את חיית המחמד?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.coanswerntent}>
                    ישנן מספר עדויות כי חיות (בעיקר חתולים) עלולות להידבק בנגיף קורונה החדש, עם זאת אין עדות כי החיה יכולה להדביק בני אדם.
מומלץ לנקוט במשנה זהירות ולא לטפל בחיית מחמד אם סובלים מתסמינים החשודים כמחלת קורונה ואם חייבים לבא במגע עם בעלי חיים במצב זה יש לעטות מסכת פה-אף ולהקפיד על רחיצת ידיים.
אנשים אשר אובחנו כחולי קורונה ויש ברשותם חית מחמד (בעיקר חתול) אשר יש חשד כי נדבקה, מתבקשים להיות בבידוד בזמן מחלתם יחד עם חיית המחמד.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Faq
