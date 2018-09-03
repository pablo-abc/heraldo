import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  HttpCode,
  UseGuards,
  Req,
  Patch,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Comment } from '../comments/interfaces/comment.interface';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { FindCommentsDto } from '../comments/dto/find-comment.dto';
import { PatchArticleDto } from './dto/patch-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { Validator } from 'class-validator';
import { VotesService } from '../votes/votes.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';
import { Vote } from '../votes/interfaces/vote.interface';
import * as jwt from 'jsonwebtoken';
const validator = new Validator();

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
    private readonly votesService: VotesService,
  ) { }

  @Get()
  findAll(@Query() query: FindArticleDto): Promise<Article[]> {
    const { limit, skip, ...rest } = query;
    return this.articlesService.findAll(rest, limit, skip);
  }

  @Get(':_id')
  @UsePipes(new ValidationPipe())
  findById(@Param() findArticleDto: FindArticleDto): Promise<Article> {
    return this.articlesService.findById(findArticleDto);
  }

  @Get(':articleId/comments')
  findComments(@Param() findCommentDto: FindCommentsDto): Promise<Comment[]> {
    return this.commentsService.findAll(findCommentDto);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':_id')
  patch(@Body() patchArticleDto: PatchArticleDto, @Param() findArticleDto: FindArticleDto): Promise<Article> {
    return this.articlesService.patchById(findArticleDto, patchArticleDto);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Req() req): Promise<Article> {
    return this.articlesService.create(createArticleDto, req);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post(':_id/comments')
  addComment(@Body() createCommentDto: CreateCommentDto, @Param() findArticleDto: FindArticleDto, @Req() req): Promise<Comment> {
    return this.commentsService.create(createCommentDto, req, findArticleDto._id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':_id')
  @HttpCode(204)
  deleteById(@Param() findArticleDto: FindArticleDto) {
    this.articlesService.deleteById(findArticleDto._id);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post(':_id/votes')
  async addVote(@Body() createVoteDto: CreateVoteDto, @Param() findArticleDto: FindArticleDto, @Req() req): Promise<Vote> {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const createdVote = new CreateVoteDto(
      user._id,
      findArticleDto._id,
      createVoteDto.vote,
    );
    const vote = await this.votesService.addVote(createdVote);
    const voteCount = await this.votesService.countVotes({ articleId: findArticleDto._id });
    this.articlesService.patchById({ _id: findArticleDto._id }, { votes: voteCount });
    return vote;
  }
}
