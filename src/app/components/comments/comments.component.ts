import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
import io from 'socket.io-client'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolBarElement: any
  commentForm: FormGroup;
  postId: any
  commentsArray = []
  socket: any
  post: string
  constructor(private fb: FormBuilder, private postService: PostService, private router: ActivatedRoute) {
    this.socket = io('http://localhost:3000')

  }

  ngOnInit() {
    this.toolBarElement = document.querySelector('.nav-content')
    this.postId = this.router.snapshot.paramMap.get('id')
    this.init()
    this.getPost();

    this.socket.on('refreshPage', () => {
      this.getPost()
    })
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }
  ngAfterViewInit() {
    this.toolBarElement.style.display = 'none'
  }

  addComment() {
    console.log(this.commentForm.value);
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {})
      this.commentForm.reset()
    })
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data.post.post
      this.commentsArray = data.post.comments.reverse()
    })
  }

  TimeFromNow(time) {
    return moment(time).fromNow()
  }

}
