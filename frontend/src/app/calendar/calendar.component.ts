import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Todo } from '../services/shared/todo.model';
import { DbService } from '../services/db/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  todos?: Todo[];
  crafts?: any[];
  isLoading?:boolean;
  monthSelect?: any[];
  dateSelect?: moment.Moment;
  dateValue?: moment.Moment;
  date: moment.Moment = moment();

  constructor(private dbService: DbService, private router:Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getDaysFromDate(this.date.year(), this.date.month());
    this.loadTaskData();
  }

  getDaysFromDate(year: any, month: any) {
    const startDate = moment.utc(`${year}-${month + 1}-01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      const day = parseInt(a) + 1;
      const dayObject = startDate.clone().date(day);
      return {
        name: dayObject.format("dddd"),
        value: day,
        indexWeek: dayObject.isoWeekday(),
        todos: [] // Inicializamos la propiedad 'todos' en cada objeto 'dayItem'
      };
    });

    this.monthSelect = arrayDays;
  }

  async changeMonth(flag: any) {
    if (flag < 0) {
      this.dateSelect = this.dateSelect?.clone().subtract(1, "month");
    } else {
      this.dateSelect = this.dateSelect?.clone().add(1, "month");
    }
    await this.loadTaskData();

    this.getDaysFromDate(this.dateSelect?.year(), this.dateSelect?.month());
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect?.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    this.dateValue = moment(parse);
  }

  loadTaskData() {
    this.dbService.getAllTasks().subscribe((res) => {
      this.todos = res.data;
      this.dbService.getCrafts().subscribe((crafts) => {
        this.crafts = crafts;
        this.isLoading = false;
  
        if (this.todos) {
          this.todos = this.todos.filter((task) => {
            const createdCraft = this.crafts?.find((craft) => craft.taskId === task._id);
            return createdCraft && res.userId === createdCraft.userId;
          });
        }

        this.todos?.sort((a, b) => {
          if (a.start_time && b.start_time) {
            return a.start_time.localeCompare(b.start_time);
          }
          return 0;
        });
  
        // Asignar las tareas correspondientes a cada día
        this.monthSelect?.forEach((dayItem) => {
          const dayValue = `${this.dateSelect?.format('YYYY-MM')}-${dayItem.value.toString().padStart(2, '0')}`;
          dayItem.todos = this.todosForDay(dayValue);
          dayItem.hasTodos = dayItem.todos.length > 0;
        });
      });
    });
  }

  todosForDay(dayValue: string): any[] {
    if (this.todos) {
      return this.todos.filter(todo => todo.day === dayValue);
    }
    return [];
  }

  addNewTaskOnDay(day: any){
    const formattedDay = day.value < 10 ? `0${day.value}` : day.value;
    if(this.dateSelect){
      const formattedMonth = this.dateSelect?.month() + 1 < 10 ? `0${this.dateSelect?.month() + 1}` : this.dateSelect?.month() + 1;
      const formattedYear = this.dateSelect?.year();
      const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
      this.router.navigate(['/create'], { queryParams: { day: formattedDate } });
    }
  }

}