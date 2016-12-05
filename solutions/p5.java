import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    int n = s.nextInt();
    double total = 0;
    for (int i = 0; i < n; i++) {
      double score = s.nextDouble();
      total += score;
    }
    double average = total / n;
    System.out.println(average);
  }
}
