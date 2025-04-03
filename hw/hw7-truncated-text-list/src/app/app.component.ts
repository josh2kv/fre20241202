import { Component } from '@angular/core';
import { Item } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hw7-truncated-text-list';
  selectedItemId: number | null = null;
  items: Item[] = [
    {
      id: 1,
      title: 'The Art of Programming',
      content:
        'Programming is both a science and an art form. It requires logical thinking and creative problem-solving skills. The best programmers are those who can write code that is not only functional but also elegant and maintainable. They understand that code is read more often than it is written, and therefore strive to make their code as clear and understandable as possible.',
      color: 'red',
    },
    {
      id: 2,
      title: 'Machine Learning Revolution',
      content:
        'Machine learning has transformed the way we approach problem-solving in the digital age. From recommendation systems to autonomous vehicles, ML algorithms are becoming increasingly sophisticated and capable. The ability of machines to learn from data and improve their performance without explicit programming has opened up new possibilities across various industries and domains.',
      color: 'green',
    },
    {
      id: 3,
      title: 'Web Development Trends',
      content:
        'The landscape of web development is constantly evolving with new frameworks, libraries, and best practices emerging regularly. Modern web applications demand responsive designs, optimal performance, and seamless user experiences. Developers must stay updated with the latest tools and technologies while ensuring their applications are secure, scalable, and accessible to all users.',
      color: 'blue',
    },
    {
      id: 4,
      title: 'Cybersecurity Challenges',
      content:
        'As our world becomes increasingly connected, the importance of cybersecurity cannot be overstated. Organizations face numerous challenges in protecting their digital assets from sophisticated cyber threats. From ransomware attacks to social engineering schemes, security professionals must constantly adapt their strategies to stay ahead of malicious actors while maintaining the balance between security and usability.',
      color: 'black',
    },
  ];

  get selectedItem(): Item | null {
    return this.items.find((item) => item.id === this.selectedItemId) || null;
  }
}
